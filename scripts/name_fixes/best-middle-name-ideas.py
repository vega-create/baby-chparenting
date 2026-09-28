import os, importlib.util
_s = importlib.util.spec_from_file_location("_common", os.path.join(os.path.dirname(os.path.abspath(__file__)), "_common.py"))
_m = importlib.util.module_from_spec(_s); _s.loader.exec_module(_m)
ROWS = dict(_m.COMMON)
SHARED = True
ROWS.update({
 "Francis": (None, None, None, "Frenchman; later understood as 'free one'"),
 "Frances": (None, None, None, "Frenchwoman; later understood as 'free one'"),
 "Kenneth": (None, None, None, "From two Gaelic names meaning 'born of fire' and 'handsome'"),
 "Lawrence": (None, None, None, "From Laurentum"),
 "Patrick": (None, None, None, "Nobleman, patrician"),
 "William": (None, None, None, "Resolute protector"),
 "Beckett": (None, None, None, "From an English surname, possibly 'little brook' or 'bee cottage'"),
 "Cash": (None, None, None, "From an English surname for a maker of chests"),
 "Ellis": (None, None, "English / Welsh", "A medieval English form of Elijah; also from Welsh Elisedd, 'kind'"),
 "Flynn": (None, None, None, "Descendant of the red-haired one"),
 "Grant": (None, None, "Scottish, from French", "Great, tall"),
 "Catherine": (None, None, None, "Meaning uncertain; long associated with Greek katharos, 'pure'"),
 "Katherine": (None, None, None, "Meaning uncertain; long associated with Greek katharos, 'pure'"),
 "Diana": (None, None, None, "Divine"),
 "Elizabeth": (None, None, None, "My God is an oath"),
 "Helen": (None, None, None, "Probably 'torch' or 'shining light'"),
 "Jane": (None, None, None, "Feminine form of John, 'God is gracious'"),
 "Louise": (None, None, "French, from Germanic", "Feminine form of Louis, 'famous warrior'"),
 "Marie": (None, None, None, "French form of Mary; meaning uncertain"),
 "Patricia": (None, None, None, "Noblewoman"),
 "Isolde": (None, None, None, "Meaning uncertain; possibly 'ice ruler'"),
 "Juniper": (None, None, None, "The juniper, an evergreen shrub"),
 "Blythe": (None, None, None, "Cheerful, happy"),
 "Nell": (None, None, None, "Pet form of Eleanor, Ellen, or Helen"),
 "Rae": (None, None, None, "Short form of Rachel, 'ewe'; also a feminine form of Ray"),
 "Pearl": (None, None, None, "Pearl"),
})
PROSE = [("Instead of **William** (strong-willed warrior), use **Liam** or **Valentino**", "Instead of **William** (resolute protector), use **Liam** or **Willa**")]
