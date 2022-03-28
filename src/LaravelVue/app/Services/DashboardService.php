<?php

namespace App\Services;

use App\DataTransferObjects\Dashboard\DashboardCreateDto;
use App\DataTransferObjects\Dashboard\DashboardUpdateDto;
use App\DataTransferObjects\Dashboard\DashboardImportDto;
use App\Exceptions\BusinessException;
use App\Imports\UserImport;
use App\Models\Dashboard;
use Illuminate\Http\Response;
use PHPExcel;
use Illuminate\Support\Facades\DB;
use PHPExcel_IOFactory;
use File;
use Session;

/**
 * @todo
 * Class DashboardService
 * @package App\Services
 */
class DashboardService
{

    /**
     * @param DashboardImportDto $dto
     */
    public function import(DashboardImportDto $dto)
    {

        $import = new UserImport();
        $path = $dto->file->getRealPath();
        $extension = File::extension($dto->file->getClientOriginalName());
        if ($extension == "xlsx" || $extension == "xls" || $extension == "csv") {

            $path = $dto->file->getRealPath();
            $dto->file->store('/excels');
            $excel = PHPExcel_IOFactory::load($path);

            Foreach($excel ->getWorksheetIterator() as $worksheet) {
                $lists[] = $worksheet->toArray();
            }

            return $lists;
        }
    }

}
