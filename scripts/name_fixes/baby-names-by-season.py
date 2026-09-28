import os, importlib.util
_s = importlib.util.spec_from_file_location("_common", os.path.join(os.path.dirname(os.path.abspath(__file__)), "_common.py"))
_m = importlib.util.module_from_spec(_s); _s.loader.exec_module(_m)
ROWS = dict(_m.COMMON)
SHARED = True
ROWS.update({
 "Haruki": (None, None, None, "Often written 春樹, 'spring' + 'tree'"),
 "Maxwell": (None, None, None, "Mack's stream"),
 "Neo": (None, None, None, "New (Greek); in Tswana, 'gift'"),
 "Ren": (None, None, None, "'Lotus' when written 蓮"),
 "Verna": (None, None, None, "From Latin vernus, 'of spring'"),
 "August": (None, None, None, "Venerable; also the month"),
 "Naia": (None, None, "Greek / Basque", "From the naiads, water nymphs; in Basque, 'wave'"),
 "Raya": (None, None, "Hebrew", "Friend"),
 "Amber": (None, None, "Arabic, via English", "Golden fossilized resin"),
 "Rowan": (None, None, None, "Little red-haired one; also the rowan tree"),
 "Sienna": (None, None, None, "Reddish-brown; from the city of Siena"),
 "Russet": (None, None, "French, via English", "Reddish-brown"),
})
PROSE = []
