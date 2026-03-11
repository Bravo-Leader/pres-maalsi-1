# PowerShell script to generate all PlantUML diagrams for the presentation
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "PlantUML Diagram Generation for Slides" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Create exports directory
$exportsDir = "C4_Architecture\exports"
if (-not (Test-Path $exportsDir)) {
    New-Item -ItemType Directory -Path $exportsDir -Force | Out-Null
    Write-Host "Created exports directory: $exportsDir" -ForegroundColor Green
}

# Define mappings: source PUML file -> target PNG name
$diagrams = @(
    @{Source="C4_Architecture\AS-IS_Architecture_Actuelle\N1_Contexte_Actuel.puml"; Target="slide2-as-is-contexte.png"},
    @{Source="C4_Architecture\AS-IS_Architecture_Actuelle\N2_Architecture_Actuelle.puml"; Target="slide3-as-is-architecture.png"},
    @{Source="C4_Architecture\TO-BE_Architecture_Proposee\N1_Contexte_Cible.puml"; Target="slide8-to-be-contexte.png"},
    @{Source="C4_Architecture\TO-BE_Architecture_Proposee\N2_Architecture_Hexagonale_Complete.puml"; Target="slide9-hexagonale.png"},
    @{Source="C4_Architecture\TO-BE_Architecture_Proposee\N3_Detail_Hexagonal_Commande.puml"; Target="slide10-detail-commande.png"},
    @{Source="C4_Architecture\TO-BE_Architecture_Proposee\Persona_Client.puml"; Target="slide11-persona-client.png"},
    @{Source="C4_Architecture\TO-BE_Architecture_Proposee\Persona_Franchise.puml"; Target="slide12-persona-franchise.png"},
    @{Source="C4_Architecture\TO-BE_Architecture_Proposee\Persona_Livreur.puml"; Target="slide13-persona-livreur.png"},
    @{Source="C4_Architecture\TO-BE_Architecture_Proposee\Persona_Administrateur.puml"; Target="slide14-persona-admin.png"},
    @{Source="C4_Architecture\COMPARAISON_Avant_Apres.puml"; Target="slide15-comparaison.png"}
)

$successCount = 0
$failCount = 0
$total = $diagrams.Count

Write-Host "Generating $total diagrams..." -ForegroundColor Yellow
Write-Host ""

foreach ($i in 0..($diagrams.Count - 1)) {
    $diagram = $diagrams[$i]
    $num = $i + 1
    $source = $diagram.Source
    $target = $diagram.Target

    Write-Host "[$num/$total] Generating $target..." -ForegroundColor White

    if (-not (Test-Path $source)) {
        Write-Host "  ERROR: Source file not found: $source" -ForegroundColor Red
        $failCount++
        continue
    }

    # Generate SVG first (more reliable)
    $result = java -jar plantuml.jar $source -tsvg -charset UTF-8 2>&1

    # Find generated SVG file
    $sourceDir = Split-Path $source -Parent
    $sourceBaseName = [System.IO.Path]::GetFileNameWithoutExtension($source)
    $svgFile = Join-Path $sourceDir "$sourceBaseName.svg"

    if (Test-Path $svgFile) {
        # Now generate PNG
        $pngResult = java -jar plantuml.jar $source -tpng -charset UTF-8 2>&1
        $pngFile = Join-Path $sourceDir "$sourceBaseName.png"

        if (Test-Path $pngFile) {
            # Move PNG to exports folder with correct name
            $targetPath = Join-Path $exportsDir $target
            Move-Item -Path $pngFile -Destination $targetPath -Force
            Write-Host "  SUCCESS: Created $target" -ForegroundColor Green

            # Clean up SVG
            Remove-Item $svgFile -Force -ErrorAction SilentlyContinue
            $successCount++
        } else {
            Write-Host "  WARNING: SVG created but PNG failed for $target" -ForegroundColor Yellow
            # Move SVG as fallback
            $targetPath = Join-Path $exportsDir ($target -replace '\.png$', '.svg')
            Move-Item -Path $svgFile -Destination $targetPath -Force
            Write-Host "  INFO: Saved as SVG instead" -ForegroundColor Cyan
            $successCount++
        }
    } else {
        Write-Host "  ERROR: Generation failed for $target" -ForegroundColor Red
        $failCount++
    }

    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "SUMMARY" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Total diagrams: $total" -ForegroundColor White
Write-Host "Successful: $successCount" -ForegroundColor Green
Write-Host "Failed: $failCount" -ForegroundColor $(if ($failCount -gt 0) { "Red" } else { "Green" })
Write-Host ""
Write-Host "Output directory: $exportsDir" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# List generated files
Write-Host ""
Write-Host "Generated files:" -ForegroundColor Yellow
Get-ChildItem $exportsDir | ForEach-Object {
    Write-Host "  - $($_.Name)" -ForegroundColor White
}