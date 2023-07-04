package middlewares

import (
	"net/http"
	"sync"
	"time"

	"github.com/labstack/echo/v4"
)

type RateLimiter struct {
	mutex           sync.Mutex
	allowance       map[string]time.Time
	rateLimit       time.Duration
	cleanupInterval time.Duration
}

func NewRateLimiter(rate time.Duration, cleanupInterval time.Duration) *RateLimiter {
	return &RateLimiter{
		allowance:       make(map[string]time.Time),
		rateLimit:       rate,
		cleanupInterval: cleanupInterval,
	}
}

func (r *RateLimiter) IsAllowed(ip string) bool {
	r.mutex.Lock()
	defer r.mutex.Unlock()

	lastAccess, ok := r.allowance[ip]
	if !ok || time.Since(lastAccess) >= r.rateLimit*time.Minute {
		r.allowance[ip] = time.Now()
		return true
	}

	return false
}

func (r *RateLimiter) StartCleanup() {
	ticker := time.NewTicker(r.cleanupInterval)
	go func() {
		for range ticker.C {
			r.mutex.Lock()
			for ip, lastAccess := range r.allowance {
				if time.Since(lastAccess) >= r.cleanupInterval {
					delete(r.allowance, ip)
				}
			}
			r.mutex.Unlock()
		}
	}()
}

func RateLimitMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	rateLimiter := NewRateLimiter(30, 30*time.Minute)
	rateLimiter.StartCleanup()

	return func(c echo.Context) error {
		ip := c.RealIP()

		if !rateLimiter.IsAllowed(ip) {
			return c.JSON(http.StatusTooManyRequests, map[string]string{
				"message": "Rate limit exceeded. Please wait for 30 minutes.",
			})
		}

		return next(c)
	}
}
