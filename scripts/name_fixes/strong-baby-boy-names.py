import os, importlib.util
_s = importlib.util.spec_from_file_location("_common", os.path.join(os.path.dirname(os.path.abspath(__file__)), "_common.py"))
_m = importlib.util.module_from_spec(_s); _s.loader.exec_module(_m)
ROWS = dict(_m.COMMON)
PROSE = []
SHARED = True
