<?php
namespace App\Http\Services;
use App\Http\Services\OpenAiService;
use Exception;
use Spatie\PdfToText\Pdf;
use thiagoalessio\TesseractOCR\TesseractOCR;
use FFMpeg;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

class GenerationService
{
    public function generate($data,$command)
    {
        Log::info($data);
        $this->openAiService = new OpenAiService();
        $response = $this->openAiService->generate($data,$command);
        return $response;
    }
    public function extractPdfAndGenerate($pdf,$command)
    {
        $path = 'c:/Program Files/Git/mingw64/bin/pdftotext';
        $text = (new Pdf($path))
        ->setPdf($pdf)
        ->text();
        $this->deleteFile($pdf->getFilename());
        return $this->generate($text,$command);
    }
    public function deleteFile($file){
        Storage::delete($file);
    }
    public function extractImageAndGenerate($image,$command)
    {
        try {
            $msg = new TesseractOCR($image);
            $dt = $msg->run();
            $this->deleteFile($image->getFilename());
            return $this->generate($dt,$command);
        } catch(Exception $e) {
            echo $e->getMessage();
        }
    }
    public function extractAudioFromVideo($file){
        
        $media = FFMpeg::fromDisk('local')
        ->open($file->getFilename())
        ->export()
        ->toDisk('local')
        ->inFormat(new \FFMpeg\Format\Audio\Mp3)
        ->save('audio.mp3');
        $path = storage_path().'/app/audio.mp3';
        //usa la ruta completa para crear el archivo
         $file2 =  new \Symfony\Component\HttpFoundation\File\File($path);
        //obtiene el path del archivo
        $this->deleteFile($file->getFilename());
        return $file2;
    }

    public function extractFromAudio($file,$commanad)
    {
        $this->openAiService = new OpenAiService();
        $response = $this->openAiService->generateWhisper($file);
        $this->deleteFile($file->getFilename());
        return $this->generate($response,$commanad);
    }
}