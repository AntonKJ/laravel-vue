<?php

namespace App\Http\Controllers\Api\V1\Dashboard;

use App\Actions\GetComboboxList;
use App\DataTransferObjects\Dashboard\DashboardCollectionDto;
use App\DataTransferObjects\Dashboard\DashboardDataDto;
use App\DataTransferObjects\Dashboard\DashboardUpdateDto;
use App\DataTransferObjects\Dashboard\DashboardImportDto;
use App\Http\Requests\Api\V1\Dashboard\DashboardImportRequest;
use App\Http\Controllers\Controller;
use App\Models\Dashboard;
use App\Services\DashboardService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    protected int $limit = 100;

    /**
     * @param Request $request
     * @return ResponsePaginationData
     */
    public function index(Request $request)
    {
        $query = Dashboard::query();

        if (method_exists(Dashboard::class, 'scopeFilter')) {
            $query->filter($request->all());
        }
        $queryResult = $query->paginate($request->get('limit', $this->limit));

        return new ResponsePaginationData([
            'paginator' => $queryResult,
            'collection' => DashboardCollectionDto::fromArray($queryResult->items()),
        ]);
    }

    public function getitems() {
        $items = DB::table('dashboard')->get();
       return json_encode($items->toArray());
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse|object
     */
    public function show($id)
    {
        $Dashboard = Dashboard::find($id);
        $dto = DashboardDataDto::fromModel($Dashboard);

        return response()
            ->json(['data' => $dto->toArray()])
            ->setStatusCode(Response::HTTP_OK);
    }


    public function update(Request $request, DashboardService $DashboardService)
    {
        $dto = DashboardUpdateDto::fromRequest($request);
        $DashboardService->update($dto);
        $Dashboard = Dashboard::find($dto->id);

        return response()
            ->json(['data' => DashboardDataDto::fromModel($Dashboard)->toArray()])
            ->setStatusCode(Response::HTTP_OK);
    }

    public function destroy(int $id, DashboardService $DashboardService)
    {
        $DashboardService->delete($id);

        return response()
            ->json([])
            ->setStatusCode(Response::HTTP_OK);
    }

    /**
     * @param Request $request
     * @param GetComboboxList $getListAction
     * @return \Illuminate\Http\JsonResponse|object
     */
    public function getCombobox(Request $request, GetComboboxList $getListAction)
    {
        $availableFields = [
            'name',
            'key',
        ];

        $result = $getListAction->handle(Dashboard::class, $request, $availableFields);

        return response()->json(['data' => $result])->setStatusCode(Response::HTTP_OK);
    }

    public function import(DashboardImportRequest $request, DashboardService $service)
    {

        try {
            $import = $service->import(\App\DataTransferObjects\Dashboard\DashboardImportDto::fromRequest($request));

            DB::table('dashboard')->truncate();

            foreach ($import[0] as $key => $list) {
                if ($key >= 3) {
                    DB::table('dashboard')->insert([
                        'id' => $list[0],
                        'company' => $list[1],
                        'fact_oliq_data1' => $list[2],
                        'fact_oliq_data2' => $list[3],
                        'fact_ooil_data1' => $list[4],
                        'fact_ooil_data2' => $list[5],
                        'forecast_oliq_data1' => $list[6],
                        'forecast_oliq_data2' => $list[7],
                        'forecast_ooil_data1' => $list[8],
                        'forecast_ooil_data2' => $list[9]
                    ]);
                }
            }

            echo( json_encode([
                'message' => [
                    'Успех: файл загружен'
                ],
                'alert-type' => 'success'
            ]));
        } catch (\Exception $ex) {
             echo( json_encode([
                'message' => [
                    'Ошибка: '.$ex->getMessage()
                ],
                'alert-type' => 'error'
            ]));
        }
    }
}
