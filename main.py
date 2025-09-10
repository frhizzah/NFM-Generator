import os
import webview
import sys

# Get path to resources whether running as .py or from .exe
def resource_path(relative_path):
    try:
        base_path = sys._MEIPASS  # For PyInstaller
    except Exception:
        base_path = os.path.abspath(".")

    return os.path.join(base_path, relative_path)

html_file = resource_path("nfm-generator.html")
webview.create_window("NFM Generator", html_file)
webview.start()
