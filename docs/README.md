# Kundenabfrage

`kundenabfrage.template.html` ist die Quelle, `Wagenheld-offene-Angaben.pdf`
das Ergebnis. Die Zwischendatei `kundenabfrage.html` entsteht beim Bauen und
ist bewusst nicht eingecheckt — sie enthält nur das Template mit dem als
Base64 eingebetteten Logo.

Neu erzeugen:

    python3 - <<'PY'
    import base64, pathlib
    logo = base64.b64encode(pathlib.Path('public/images/logo-white.png').read_bytes()).decode()
    tpl = pathlib.Path('docs/kundenabfrage.template.html').read_text()
    pathlib.Path('docs/kundenabfrage.html').write_text(tpl.replace('__LOGO__', logo))
    PY

    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
      --headless --disable-gpu --no-pdf-header-footer \
      --print-to-pdf="docs/Wagenheld-offene-Angaben.pdf" \
      "file://$PWD/docs/kundenabfrage.html"

Das Logo muss die **weiße** Fassung sein — das Deckblatt ist dunkel, die
schwarze Datei wäre dort unsichtbar.
