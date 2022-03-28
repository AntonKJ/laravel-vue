<?php


namespace App\DataTransferObjects\Dashboard;

use App\Http\Requests\Api\V1\Dashboard\DashboardImportRequest;
use Spatie\DataTransferObject\FlexibleDataTransferObject;
use Symfony\Component\HttpFoundation\File\UploadedFile;

final class DashboardImportDto extends FlexibleDataTransferObject {

    public UploadedFile $file;

    public static function fromRequest(DashboardImportRequest $request): self
    {
        return new self([
            'request' => $request,
            'file' => $request->file('file'),
        ]);
    }

}
