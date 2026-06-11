<?php

namespace App\Mail\Transport;

use Illuminate\Support\Facades\Http;
use Symfony\Component\Mailer\SentMessage;
use Symfony\Component\Mailer\Transport\AbstractTransport;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mime\MessageConverter;

class BrevoTransport extends AbstractTransport
{
    public function __construct(protected string $key)
    {
        parent::__construct();
    }

    protected function doSend(SentMessage $message): void
    {
        $email = MessageConverter::toEmail($message->getOriginalMessage());
        $envelope = $message->getEnvelope();

        $sender = $envelope->getSender();
        $recipients = $envelope->getRecipients();

        $to = [];
        foreach ($recipients as $recipient) {
            $to[] = [
                'email' => $recipient->getAddress(),
                'name' => $recipient->getName() ?: null,
            ];
        }

        $payload = [
            'sender' => [
                'email' => $sender->getAddress(),
                'name' => $sender->getName() ?: null,
            ],
            'to' => $to,
            'subject' => $email->getSubject(),
        ];

        if ($email->getHtmlBody()) {
            $payload['htmlContent'] = $email->getHtmlBody();
        }

        if ($email->getTextBody()) {
            $payload['textContent'] = $email->getTextBody();
        }

        $response = Http::withHeaders([
            'api-key' => $this->key,
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
        ])->post('https://api.brevo.com/v3/smtp/email', $payload);

        if ($response->failed()) {
            throw new \RuntimeException(
                'Request to Brevo API failed. Reason: ' . ($response->json('message') ?? $response->body())
            );
        }
    }

    public function __toString(): string
    {
        return 'brevo';
    }
}
