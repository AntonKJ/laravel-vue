<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToCollection;

class UserImport implements ToCollection
{
    public function collection(Collection $rows)
    {
/*        echo '<pre>';
            var_dump($rows);
        echo '</pre>';*/

        return $rows;
    }
}
