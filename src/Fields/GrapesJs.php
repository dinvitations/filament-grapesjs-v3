<?php

declare(strict_types=1);

namespace Dotswan\FilamentGrapesjs\Fields;

use Filament\Forms\Components\Field;
use Filament\Forms\Concerns\HasStateBindingModifiers;
use Dotswan\FilamentGrapesjs\Fields\Concerns\InteractsWithTools;

class GrapesJs extends Field
{
    use HasStateBindingModifiers;

    use InteractsWithTools;
    protected string $view = 'filament-grapesjs::fields.grapesjs';

    protected array | Closure $tools = [];

    protected array | Closure $plugins = [
        'grapesjs-tailwind',
    ];

    protected array | Closure $settings = [];

    protected string $grapesJsData;

    protected string $htmlData;

    protected string $cssData;

    protected string $jsData;

    protected int | Closure | null $minHeight = 768;

    public function minHeight(int | Closure | null $minHeight): static
    {
        $this->minHeight = $minHeight;

        return $this;
    }

    public function getMinHeight(): ?int
    {
        return $this->evaluate($this->minHeight);
    }

    public function getGrapesJsData()
    {
        return $this->evaluate($this->getState()['grapesjs'] ?? null);
    }

    public function getHtmlData()
    {
        return $this->evaluate($this->getState()['html'] ?? null);
    }

    public function getCssData()
    {
        return $this->evaluate($this->getState()['css'] ?? null);
    }

    public function getJsData()
    {
        return $this->evaluate($this->getState()['js'] ?? null);
    }

    public function tools(array | Closure $tools): static
    {
        $this->tools = $tools;
        return $this;
    }

    public function plugins(array | Closure $plugins): static
    {
        $this->plugins = $plugins;
        return $this;
    }

    public function settings(array | Closure $settings): static
    {
        $this->settings = $settings;
        return $this;
    }

}
