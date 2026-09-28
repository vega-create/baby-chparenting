import os, importlib.util
_s = importlib.util.spec_from_file_location("_common", os.path.join(os.path.dirname(os.path.abspath(__file__)), "_common.py"))
_m = importlib.util.module_from_spec(_s); _s.loader.exec_module(_m)
ROWS = dict(_m.COMMON)
SHARED = True
ROWS.update({
 "Avery": (None, None, None, "Elf ruler"),
 "Riley": (None, None, "Irish / English", "Often given as 'valiant'; also English 'rye clearing'"),
 "Rowan": (None, None, None, "Little red-haired one; also the rowan tree"),
 "Sage": (None, None, None, "Wise; also the herb"),
 "Hayden": (None, None, "English", "Hay valley"),
 "Ellis": (None, None, "English / Welsh", "A medieval English form of Elijah; also from Welsh Elisedd, 'kind'"),
 "Remy": (None, None, None, "From Latin Remigius, 'oarsman'"),
 "Marlowe": (None, None, None, "Land left by a drained lake"),
 "Lennon": (None, None, None, "From an Irish surname, possibly 'lover' or 'little cloak'"),
 "Sutton": (None, None, None, "Southern settlement"),
 "Arden": (None, None, "English", "From an English place name; the forest in Shakespeare's As You Like It"),
 "Phoenix": (None, None, None, "Dark red; the mythical bird reborn from fire"),
 "Ocean": (None, None, "Greek, via English", "Ocean"),
})
PROSE = []
