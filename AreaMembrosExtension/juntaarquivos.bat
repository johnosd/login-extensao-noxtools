@echo off
(for %%f in (
    area.html
    background.js
    content.js
    estrutura.txt
    icon_128x128.png
    icon_16x16.png
    icon_48x48.png
    manifest.json
    popup.css
    popup.js
) do (
    echo ====== %%f ======
    type "%%f"
    echo.
)) > tudo_junto.txt