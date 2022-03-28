<?php

namespace App\Imports;

use App\Models\Dashboard;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\SkipsFailures;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Storage;

class DashboardBarcodeImport implements ToModel, WithHeadingRow
{
    use Importable, SkipsFailures;

    public $successCount = 0; // количество успешно обработанных строк
    public $totalCount = 0; // всего строк
    public $errors = []; // массив ошибок

    public function __construct() {
    }

    /**
     * @param array $row
     *
     * @return Model|Model[]|null
     */
    public function model(array $row) {

        echo '<pre>';
            var_dump($row);
        echo '</pre>';
        exit();

        $this->totalCount++;

    if (strlen($row["nazvanie"]) > 0) {

        if (isset($row['simvolnyi_kod'])) {
            $dashboard = Product::where('code', $row['simvolnyi_kod'])->first();
        } else {
            $dashboard = false;
        }

        if (!$dashboard) {
            $dashboard = Product::updateOrCreate(
                [
                    'name' => $row["nazvanie"],
                    'description' => $row["opisanie"],
                    'category_id' => $category->id,
                    'code' => $row["simvolnyi_kod"],
                    'sort' => $row["sortirovka"],
                ]
            );
        }

        try {
            $contents = @file_get_contents($row["kartinki"]);
        }
        catch (Exception $e) {
            $contents = false;
            $this->errors[] = 'Product: ' . $row['nazvanie'] . ' i can not download image ' . $row["kartinki"];
        }

        if( $contents ) { //   http://maket.market/
            /*            $path =  $_SERVER['DOCUMENT_ROOT'] . '/storage/product_layouts/';
                        $mount = $row["simvolnyi_kod"];
                        $file =  $path . $mount .'/'. $info['basename'];
                        if (!is_dir($path . $mount)) {
                            mkdir($path . $mount);
                        }
                     //   file_put_contents($file, $contents);*/
            //dd($row);
            @$dashboard->addMediaFromUrl($row["kartinki"])->toMediaCollection('product_layouts', 'product_layouts');
        }

        $type_import = 1 == 1 ? 'import_EXCEL' : 'Bitrix_CSV';

        if ($type_import == 'import_EXCEL') {
            //dd($row);
            $filters = explode("\n", $row['filtry']);
            $i = 0;
            foreach ($filters as $filter) {
                $filter_values = explode(":", $filter);
                $filter_name = $filter_values[0];
                $filter_value = $filter_values[1];
                $property_values = '';
                $propertyValuesId = '';
                $properties = Property::where('name', 'like', '%' . trim($filter_name) . '%')
                    ->where('company_id', '=', $company->id)
                    ->first();
                if (empty($properties) || is_null($properties) || !$properties->id) {
                    $propertiesId = Property::create(
                        [
                            'name' => $filter_name,
                            'company_id' => $company->id,
                            'sort' => 500,
                        ]
                    )->id;

                    $property_values = PropertyValues::where('value', 'like', '%' . trim($filter_value) . '%')
                        //   ->where('property_id', '=', $propertiesId)
                        ->first();
                    if (empty($property_values) || is_null($property_values) || !$property_values->id) {
                        $propertyValuesId = PropertyValues::create(
                            [
                                'property_id' => $propertiesId,
                                'value' => $filter_value,
                                'sort' => ++$i,
                            ]
                        )->id;
                    }

                    $dashboard_property_values = \DB::table('product_property_values')->where('product_id', $dashboard->id)
                        ->where('property_values_id', '=', empty($property_values) || is_null($property_values) || !$property_values->id ? $propertyValuesId : $property_values->id)
                        ->first();

                    if (is_null($dashboard_property_values)) {

                        // $dashboardPropertyValuesResult = \DB::insert('insert into product_property_values (product_id, property_values_id) values ('.$dashboard->id.' ,'.$propertyValId.')');

                        \DB::table('product_property_values')->insert(
                            array(
                                'product_id' => $dashboard->id,
                                'property_values_id' => empty($property_values) || is_null($property_values) || !$property_values->id ? $propertyValuesId : $property_values->id,
                            )
                        );

                        //dd(\DB::unprepared('insert into product_property_values (product_id, property_values_id) values ('.$dashboard->id.' ,'.$propertyValId.')'));
                    }

                }

                $propertyValId = isset($propertyValuesId) && is_integer($propertyValuesId) ? $propertyValuesId : PropertyValues::where('value', 'like', '%' . $filter_value . '%')->first();
                if (is_object($propertyValId) && is_object($dashboard)) {
                    $dashboardPropertyValuesQuery = \DB::table('product_property_values');
                    $dashboard_property_values = $dashboardPropertyValuesQuery->where('product_id', $dashboard->id)
                        ->where('property_values_id', '=', $propertyValId->id)
                        ->first();

                    if (is_null($dashboard_property_values)) {

                        // $dashboardPropertyValuesResult = \DB::insert('insert into product_property_values (product_id, property_values_id) values ('.$dashboard->id.' ,'.$propertyValId.')');

                        \DB::table('product_property_values')->insert(
                            array(
                                'product_id' => $dashboard->id,
                                'property_values_id' => $propertyValId->id,
                            )
                        );

                        //dd(\DB::unprepared('insert into product_property_values (product_id, property_values_id) values ('.$dashboard->id.' ,'.$propertyValId.')'));
                    }
                }

                // $properties->id; // теперь добавим значение
            }
            //exit();
        } else {
            $filters;
        }
/*        if ($matches) {
            dd($row);
            dd($matches);
            exit();
        } else {
            $this->errors[] = 'Product: ' . $row['nazvanie'] . ' you filters do not validation because not matching default pattern alues,
            maybe add switch line string';
            return null;
        }*/


        if (!$dashboard) {
            $this->errors[] = 'Product with code: ' . $row['simvolnyi_kod'] . ' not found';
            return null;
        }

        if (isset($row['code'])) {
            $dashboard->additional_fields = $this->addBarcode($dashboard, $row);
        }

        $dashboard->save();
        foreach ($this->locales as $locale) {
            $translatedProduct = $dashboard->translate($locale);
            // $translatedProduct->additional_fields = $this->addBarcode($dashboard, $row);
            $translatedProduct->save();
        }

    } else {
        $this->errors[] = 'Product with code: Undefined not found';
        return null;
    }

        $this->successCount++;

        return $dashboard;
    }

    private function addBarcode(Model $dashboard, array $row): string {
        $additionalFields = json_decode($dashboard->additional_fields, true);
        if (isset($additionalFields['barcode'])) {
            $additionalFields['barcode']['value'] = $row['barcode'];

        } else {
            $barCode = [
                'key' => 'barcode',
                'name' => 'Barcode',
                'value' => $row['barcode'],
            ];
            $additionalFields['barcode'] = $barCode;
        }

        return json_encode($additionalFields);
    }
}
