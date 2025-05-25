<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class GenerateCrudStructure extends Command
{
    protected $signature = 'make:crud {name}';
    protected $description = 'Generate Controller, Service, and Repository for a model';

    public function handle()
    {
        $name = $this->argument('name');
        $model = ucfirst($name);
        $controller = "{$model}Controller";
        $service = "{$model}Service";
        $repository = "{$model}Repository";

        $controllerPath = app_path("Http/Controllers/{$controller}.php");
        $servicePath = app_path("Services/{$service}.php");
        $repositoryPath = app_path("Repositories/{$repository}.php");

        if (!File::exists(app_path('Services'))) {
            File::makeDirectory(app_path('Services'));
        }
        if (!File::exists(app_path('Repositories'))) {
            File::makeDirectory(app_path('Repositories'));
        }

        File::put($controllerPath, <<<EOD
        <?php

        namespace App\Http\Controllers;

        use App\Services\\{$service};
        use Illuminate\Http\Request;

        class {$controller} extends Controller
        {
            public function __construct(private {$service} \${$name}Service) {}
        }
        EOD);

        File::put($servicePath, <<<EOD
        <?php

        namespace App\Services;

        use App\Repositories\\{$repository};

        class {$service}
        {
            public function __construct(private {$repository} \${$name}Repository) {}
        }
        EOD);

        File::put($repositoryPath, <<<EOD
        <?php

        namespace App\Repositories;

        use App\Models\\{$model};

        class {$repository} extends BaseRepository
        {
            public function __construct({$model} \$model)
            {
                parent::__construct(\$model);
            }
        }
        EOD);

        $this->info("Generated {$controller}, {$service}, and {$repository}.");
    }
}


