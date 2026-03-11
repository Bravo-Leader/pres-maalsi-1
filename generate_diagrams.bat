@echo off
REM Script to generate PNG exports from PlantUML files for the presentation

echo Generating PlantUML diagrams...
echo.

REM Download PlantUML jar if not present
if not exist "plantuml.jar" (
    echo Downloading PlantUML...
    curl -L -o plantuml.jar https://github.com/plantuml/plantuml/releases/download/v1.2024.7/plantuml-1.2024.7.jar
    echo.
)

REM Create exports directory
if not exist "C4_Architecture\exports" mkdir "C4_Architecture\exports"

echo Generating diagram exports...
echo.

REM AS-IS Diagrams
echo [1/10] Generating slide2-as-is-contexte.png...
java -jar plantuml.jar "C4_Architecture\AS-IS_Architecture_Actuelle\N1_Contexte_Actuel.puml" -o "..\..\C4_Architecture\exports" -tpng
if exist "C4_Architecture\exports\N1_Contexte_Actuel.png" (
    ren "C4_Architecture\exports\N1_Contexte_Actuel.png" "slide2-as-is-contexte.png"
)

echo [2/10] Generating slide3-as-is-architecture.png...
java -jar plantuml.jar "C4_Architecture\AS-IS_Architecture_Actuelle\N2_Architecture_Actuelle.puml" -o "..\..\C4_Architecture\exports" -tpng
if exist "C4_Architecture\exports\N2_Architecture_Actuelle.png" (
    ren "C4_Architecture\exports\N2_Architecture_Actuelle.png" "slide3-as-is-architecture.png"
)

REM TO-BE Diagrams
echo [3/10] Generating slide8-to-be-contexte.png...
java -jar plantuml.jar "C4_Architecture\TO-BE_Architecture_Proposee\N1_Contexte_Cible.puml" -o "..\..\C4_Architecture\exports" -tpng
if exist "C4_Architecture\exports\N1_Contexte_Cible.png" (
    ren "C4_Architecture\exports\N1_Contexte_Cible.png" "slide8-to-be-contexte.png"
)

echo [4/10] Generating slide9-hexagonale.png...
java -jar plantuml.jar "C4_Architecture\TO-BE_Architecture_Proposee\N2_Architecture_Hexagonale_Complete.puml" -o "..\..\C4_Architecture\exports" -tpng
if exist "C4_Architecture\exports\N2_Architecture_Hexagonale_Complete.png" (
    ren "C4_Architecture\exports\N2_Architecture_Hexagonale_Complete.png" "slide9-hexagonale.png"
)

echo [5/10] Generating slide10-detail-commande.png...
java -jar plantuml.jar "C4_Architecture\TO-BE_Architecture_Proposee\N3_Detail_Hexagonal_Commande.puml" -o "..\..\C4_Architecture\exports" -tpng
if exist "C4_Architecture\exports\N3_Detail_Hexagonal_Commande.png" (
    ren "C4_Architecture\exports\N3_Detail_Hexagonal_Commande.png" "slide10-detail-commande.png"
)

REM Persona Diagrams
echo [6/10] Generating slide11-persona-client.png...
java -jar plantuml.jar "C4_Architecture\TO-BE_Architecture_Proposee\Persona_Client.puml" -o "..\..\C4_Architecture\exports" -tpng
if exist "C4_Architecture\exports\Persona_Client.png" (
    ren "C4_Architecture\exports\Persona_Client.png" "slide11-persona-client.png"
)

echo [7/10] Generating slide12-persona-franchise.png...
java -jar plantuml.jar "C4_Architecture\TO-BE_Architecture_Proposee\Persona_Franchise.puml" -o "..\..\C4_Architecture\exports" -tpng
if exist "C4_Architecture\exports\Persona_Franchise.png" (
    ren "C4_Architecture\exports\Persona_Franchise.png" "slide12-persona-franchise.png"
)

echo [8/10] Generating slide13-persona-livreur.png...
java -jar plantuml.jar "C4_Architecture\TO-BE_Architecture_Proposee\Persona_Livreur.puml" -o "..\..\C4_Architecture\exports" -tpng
if exist "C4_Architecture\exports\Persona_Livreur.png" (
    ren "C4_Architecture\exports\Persona_Livreur.png" "slide13-persona-livreur.png"
)

echo [9/10] Generating slide14-persona-admin.png...
java -jar plantuml.jar "C4_Architecture\TO-BE_Architecture_Proposee\Persona_Administrateur.puml" -o "..\..\C4_Architecture\exports" -tpng
if exist "C4_Architecture\exports\Persona_Administrateur.png" (
    ren "C4_Architecture\exports\Persona_Administrateur.png" "slide14-persona-admin.png"
)

REM Comparison Diagram
echo [10/10] Generating slide15-comparaison.png...
java -jar plantuml.jar "C4_Architecture\COMPARAISON_Avant_Apres.puml" -o "..\C4_Architecture\exports" -tpng
if exist "C4_Architecture\exports\COMPARAISON_Avant_Apres.png" (
    ren "C4_Architecture\exports\COMPARAISON_Avant_Apres.png" "slide15-comparaison.png"
)

echo.
echo ========================================
echo All diagrams generated successfully!
echo Output directory: C4_Architecture\exports\
echo ========================================
echo.

pause
