import os, importlib.util
_s = importlib.util.spec_from_file_location("_common", os.path.join(os.path.dirname(os.path.abspath(__file__)), "_common.py"))
_m = importlib.util.module_from_spec(_s); _s.loader.exec_module(_m)
ROWS = dict(_m.COMMON)
SHARED = True
ROWS.update({
 "Jasper": (None, None, None, "Treasurer"),
 "Owen": (None, None, None, "Possibly 'well-born' or 'youth'"),
 "Oscar": (None, None, None, "Deer friend; or 'spear of the gods'"),
 "Sebastian": (None, None, None, "From Sebaste; from a Greek word meaning 'venerable'"),
 "Arthur": (None, None, None, "Meaning uncertain, possibly 'bear'"),
 "Elliott": (None, None, None, "From Elias, the Greek form of Elijah"),
 "William": (None, None, None, "Resolute protector"),
 "Theodore": (None, None, None, "Gift of God"),
 "Elizabeth": (None, None, None, "My God is an oath"),
 "Riley": (None, None, None, "Often given as 'valiant'; also English 'rye clearing'"),
 "Avery": (None, None, None, "Elf ruler"),
 "Emery": (None, None, None, "From a Germanic name ending in ric, 'power'"),
 "Wyatt": (None, None, None, "Brave in war"),
 "Morgan": (None, None, None, "Possibly 'sea chief' or 'sea circle'"),
 "Selene": (None, None, None, "Moon"),
 "Stella": (None, None, None, "Star"),
 "Aurora": (None, None, None, "Dawn"),
 "Nova": (None, None, None, "New"),
 "Matilda": (None, None, None, "Mighty in battle"),
 "Adelaide": (None, None, None, "Noble kind"),
 "Emmeline": (None, None, None, "From a Germanic word meaning 'work'"),
 "Frederick": (None, None, None, "Peaceful ruler"),
 "Harriet": (None, None, None, "Feminine form of Henry, 'home ruler'"),
})
PROSE = []
