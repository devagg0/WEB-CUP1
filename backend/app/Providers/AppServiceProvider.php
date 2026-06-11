<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        \Illuminate\Support\Facades\Mail::extend('brevo', function (array $config = []) {
            return new \App\Mail\Transport\BrevoTransport(
                config('services.brevo.key') ?? env('BREVO_API_KEY')
            );
        });
    }
}
