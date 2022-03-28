<?php

namespace App\DataTransferObjects\Dashboard;

use App\Models\Dashboard;
use Spatie\DataTransferObject\DataTransferObjectCollection;

class DashboardCollectionDto extends DataTransferObjectCollection
{
    public function current(): DashboardDataDto
    {
        return parent::current();
    }

    public static function fromArray(array $data): DashboardCollectionDto
    {
        return new static(
            array_map(fn (Dashboard $category) => DashboardDataDto::fromModel($category), $data)
        );
    }
}
