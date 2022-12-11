<?php

namespace App\Jobs;

use App\Http\Services\GenerationService;
use App\Models\Generation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class Generator implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $prompt;
    private $command;
    private $type;
    private $genId;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($prompt,$command,$type,$genId)
    {
        $this->prompt = $prompt;
        $this->command = $command;
        $this->type = $type;
        $this->genId = $genId;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $result = "Elija tipo de entrada correcta";
        $processed = false;
        $generateService = new GenerationService();
        log::info("Entro".$this->type);
        if($this->type == 1){
            $result = $generateService->generate($this->prompt,$this->command);
            $processed = true;
        }else if($this->type == 2){
            $file =  new \Symfony\Component\HttpFoundation\File\File($this->prompt);
            $result = $generateService->extractPdfAndGenerate($file, $this->command);
            $processed = true;
        }else if($this->type == 3){
            $file =  new \Symfony\Component\HttpFoundation\File\File($this->prompt);
            $result = $generateService->extractImageAndGenerate($file,$this->command);
            $processed = true;
        }else if($this->type == 4){
            $file =  new \Symfony\Component\HttpFoundation\File\File($this->prompt);
            $result = $generateService->extractFromAudio($file,$this->command);
            $processed = true;
        }else if($this->type == 5){
            $file =  new \Symfony\Component\HttpFoundation\File\File($this->prompt);
            $audio = $generateService->extractAudioFromVideo($file); 
            $result = $generateService->extractFromAudio($audio,$this->command);
            $processed = true;
        }
        if($processed){
            Generation::find($this->genId)->update([
                'result' => $result,
                'status' => 'finalizado'
            ]);
        }
    }
}
