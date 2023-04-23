package db

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/devchrisar/Gotapes/models"
	_ "github.com/joho/godotenv/autoload"
	amqp "github.com/rabbitmq/amqp091-go"
	"log"
	"os"
)

func PublishToQueue(tweet models.Tweet) error {
	conn, err := amqp.Dial(os.Getenv("RABBIT_URI"))
	if err != nil {
		return fmt.Errorf("could not connect to RabbitMQ: %v", err)
	}
	fmt.Println("Connected to RabbitMQ successfully")
	defer conn.Close()

	ch, err := conn.Channel()
	if err != nil {
		return fmt.Errorf("could not open channel: %v", err)
	}
	defer ch.Close()

	err = ch.ExchangeDeclare(
		"tweets",
		"fanout",
		true,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		return err
	}

	// this part could be removed
	q, err := ch.QueueDeclare(
		"Gotapes_tweetsQueue",
		true,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		return fmt.Errorf("could not declare queue: %v", err)
	}
	// end of part that could be removed

	body, err := json.Marshal(tweet)
	if err != nil {
		return fmt.Errorf("could not marshal tweet: %v", err)
	}

	err = ch.PublishWithContext(
		context.TODO(),
		"tweets",
		q.Name,
		false,
		false,
		amqp.Publishing{
			ContentType: "application/json",
			Body:        body,
		},
	)
	if err != nil {
		return fmt.Errorf("could not publish message: %v", err)
	}

	return nil
}

func ConsumeFromQueue() {
	conn, err := amqp.Dial(os.Getenv("RABBIT_URI"))
	if err != nil {
		log.Fatalf("could not connect to RabbitMQ: %v", err)
	}
	defer conn.Close()

	ch, err := conn.Channel()
	if err != nil {
		log.Fatalf("could not open channel: %v", err)
	}
	defer ch.Close()

	q, err := ch.QueueDeclare(
		"Gotapes_tweetsQueue",
		true,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		log.Fatalf("could not declare queue: %v", err)
	}

	err = ch.QueueBind(
		q.Name,
		"",
		"tweets",
		false,
		nil,
	)
	if err != nil {
		log.Fatalf("Failed to bind the queue to the tweets exchange: %v", err)
	}

	msgs, err := ch.Consume(
		q.Name,
		"",
		true,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		log.Fatalf("could not register consumer: %v", err)
	}

	go func() {
		for message := range msgs {
			var tweet models.Tweet
			if err := json.Unmarshal(message.Body, &tweet); err != nil {
				log.Printf("could not unmarshal tweet: %v", err)
			} else {
				log.Printf("received tweet: %v", tweet)
				TweetInsertion(tweet)
			}
		}
	}()

	log.Printf(" [*] Waiting for messages. To exit press CTRL+C")

}
