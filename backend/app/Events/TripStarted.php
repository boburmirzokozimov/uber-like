<?php

namespace App\Events;

use App\Models\Trip;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TripStarted
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public Trip $trip,private readonly User $user)
    {
        //
    }

    public function broadcastOn(): array
    {
        return [
            new Channel('passenger_'.$this->user->id),
        ];
    }
}
