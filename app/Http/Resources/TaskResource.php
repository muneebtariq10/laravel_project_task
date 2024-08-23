<?php

namespace App\Http\Resources;

use App\Http\Resources\UserResource;
use App\Http\Resources\ProjectResource;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class TaskResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "description" => $this->description,
            "created_at" => (new Carbon($this->created_at))->format("Y-m-d"),
            "due_date" => (new Carbon($this->due_date))->format("Y-m-d"),
            "priority" => $this->priority,
            "status" => $this->status,
            "image" => $this->image && !(str_starts_with($this->image, 'http')) ?
            Storage::url($this->image) : $this->image,
            "project" => $this->project ? new ProjectResource($this->project) : null,
            "project_id" => $this->project_id,
            "assignedUser" => $this->assignedUser ? new UserResource($this->assignedUser) : null,
            "assigned_to" => $this->assigned_to,
            "createdBy" => new UserResource($this->createdBy),
            "updatedBy" => new UserResource($this->updatedBy),
        ];
    }
}
