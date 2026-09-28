import os, importlib.util
_s = importlib.util.spec_from_file_location("_common", os.path.join(os.path.dirname(os.path.abspath(__file__)), "_common.py"))
_m = importlib.util.module_from_spec(_s); _s.loader.exec_module(_m)
ROWS = dict(_m.COMMON)
SHARED = True
ROWS.update({
 "Arthur": (None, None, None, "Meaning uncertain, possibly 'bear'"),
 "August": (None, None, None, "Venerable"),
 "Edmund": (None, None, None, "Rich protector"),
 "Leonard": (None, None, None, "Brave as a lion"),
 "Lionel": (None, None, "French", "Little lion"),
 "Milo": (None, None, None, "Meaning uncertain; possibly 'gracious'"),
 "Oscar": (None, None, "Irish / Old English", "Deer friend; or 'spear of the gods'"),
 "Percy": (None, None, None, "From a Norman place name"),
 "Reginald": (None, None, "Germanic, via Latin", "Ruler's counsel"),
 "Winston": (None, None, None, "From an English place name, 'Wynn's town'"),
 "Adelaide": (None, None, None, "Noble kind"),
 "Cecilia": (None, None, None, "Blind"),
 "Elsie": (None, None, None, "Scottish pet form of Elizabeth, 'my God is an oath'"),
 "Florence": (None, None, None, "Flourishing"),
 "Harriet": (None, None, None, "Feminine form of Henry, 'home ruler'"),
 "Josephine": (None, None, "French", "Feminine form of Joseph, 'God will add'"),
 "Lillian": (None, None, None, "Lily"),
 "Margot": (None, None, None, "French pet form of Marguerite, 'pearl'"),
 "Pearl": (None, None, None, "Pearl"),
 "Rosalind": (None, None, None, "'Horse' + 'tender'; later read as Latin for 'pretty rose'"),
 "Winifred": (None, None, None, "Blessed peace"),
 "Theodore": (None, None, None, "Gift of God"),
})
PROSE = []
