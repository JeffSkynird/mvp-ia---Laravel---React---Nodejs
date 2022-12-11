<?php

namespace App\Http\Controllers\v1\Administracion;

use App\Http\Controllers\Controller;
use App\Http\Services\GenerationService;
use App\Jobs\Generator;
use App\Models\Generation;
use App\Models\Subscription;
use Exception;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;
use \Validator;

class GenerationController extends Controller
{
    public function jobInit(){
        Generator::dispatch();
        return response()->json([
            "status" => "200",
            "message" => 'Job iniciado',
            "type" => 'success'
        ]);
    }
   /**
     * Función para crear nuevos categories
     * @param Request $request 
     * @return json
     */
    public function create(Request $request)
    {
        DB::beginTransaction();
        try {
            $params = $request->all();
            $vacios = Validator::make($request->all(), [
                'generation_type_id' => 'required',
                'prompt' => 'required',
                'command' => 'required'
            ]);
            if ($vacios->fails()) {
                return response([
                    'message' => "No debe dejar campos vacíos",
                    'fields' => $request->all(),
                    'type' => "error",
                ]);
            }
            //$auth = Auth::user();
           /*  $subs = Subscription::where('user_id', 1)->where('status', 'activa')->first();
            if (!$subs) {
                return response()->json([
                    "status" => "500",
                    "message" => 'No tiene una suscripción activa',
                    "type" => 'error'
                ]);
            } */
            //$generateService = new GenerationService();
            $params['user_id'] = 1;
            $params['status'] = 'pendiente';
            $params['result'] = 'Procesando';
            $gen = Generation::create($params);
            if($params['generation_type_id']==1){ //TEXTO
               // $params['result'] = $generateService->generate($params['prompt'], $params['command']);
               Generator::dispatch($params['prompt'], $params['command'], $params['generation_type_id'], $gen->id);
            }else if($params['generation_type_id']==2){ //PDF
                $file = $request->file('file');
                $path = $this->saveFile($file);
                //$params['result'] = $generateService->extractPdfAndGenerate($pdf, $params['command']);
                Generator::dispatch($path, $params['command'], $params['generation_type_id'], $gen->id);
            }else if($params['generation_type_id']==3){ //IMAGEN
                $file = $request->file('file');
                $path = $this->saveFile($file);
                //$params['result'] = $generateService->extractImageAndGenerate($image, $params['command']);
                Generator::dispatch($path, $params['command'], $params['generation_type_id'], $gen->id);
            }else if($params['generation_type_id']==4){ //AUDIO
                $file = $request->file('file');
                $path = $this->saveFile($file);
                //$params['result'] = $generateService->extractFromAudio($file, $params['command']);
                Generator::dispatch($path, $params['command'], $params['generation_type_id'], $gen->id);
            }else if($params['generation_type_id']==5){ //VIDEO
                $file = $request->file('file');
                $path = $this->saveFile($file);
                //$audio = $generateService->extractAudioFromVideo($file); 
                //$params['result'] = $generateService->extractFromAudio($audio, $params['command']);
                Generator::dispatch($path, $params['command'], $params['generation_type_id'], $gen->id);
            }
            DB::commit();
            return response()->json([
                "status" => "200",
                "message" => 'Generación exitosa',
                'result' => $params['result'],
                "type" => 'success'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                "status" => "500",
                "message" => $e->getMessage(),
                "type" => 'error'
            ]);
        }
    }
 
    //funcion que guarda el archivo en el storage y retorna la ruta como \Symfony\Component\HttpFoundation\File\File
    public function saveFile($file){
        $path = Storage::putFile('', $file);
        $path = Storage::path($path);
        return $path;
    }
   
   
    /**
     * Función para obtener los datos de un categories
     * @param int $id 
     * @return json
     */
    public function show($id)
    {
        $data = Generation::where('id', $id)->first();
        return response()->json([
            "status" => "200",
            "message" => 'Datos obtenidos con éxito',
            "data" => $data,
            "type" => 'success'
        ]);
    }
    /**
     * Función para eliminar un categories
     * @param  int $id
     * @return json
     */
    public function delete($id)
    {
        DB::beginTransaction();
        try {
            $data = Generation::find($id);
            $data->delete();
            DB::commit();
            return response()->json([
                "status" => "200",
                "message" => 'Eliminación exitosa',
                "type" => 'success'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                "status" => "500",
                "message" => $e->getMessage(),
                "type" => 'error'
            ]);
        }
    }
    /**
     * Función para obtener todos los categories
     * @return json
     */
    public function index()
    {
        $data = Generation::with('generationType')->orderBy('id', 'desc')->get();
        return response()->json([
            "status" => "200",
            "data" => $data,
            "message" => 'Listado exitoso',
            "type" => 'success'
        ]);
    }
}
