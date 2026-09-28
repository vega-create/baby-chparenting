import os, importlib.util
_s = importlib.util.spec_from_file_location("_common", os.path.join(os.path.dirname(os.path.abspath(__file__)), "_common.py"))
_m = importlib.util.module_from_spec(_s); _s.loader.exec_module(_m)
ROWS = dict(_m.COMMON)
SHARED = True
ROWS.update({
 "Alex": (None, None, None, "Short form of Alexander or Alexandra, 'defender of men'"),
 "Avery": (None, None, None, "Elf ruler"),
 "Dakota": (None, None, "Dakota (Sioux)", "Friend, ally"),
 "Dana": (None, None, "English", "From a surname; possibly 'a Dane'"),
 "Drew": (None, None, "Greek", "Short form of Andrew, 'manly, brave'"),
 "Ellis": (None, None, "English / Welsh", "A medieval English form of Elijah; also from Welsh Elisedd, 'kind'"),
 "Jesse": (None, None, None, "Possibly 'gift'"),
 "Kelly": (None, None, None, "From an Irish surname, possibly 'warrior' or 'bright-headed'"),
 "Morgan": (None, None, None, "Possibly 'sea chief' or 'sea circle'"),
 "Dallas": (None, None, None, "From a Scottish place name, 'meadow dwelling'"),
 "Kit": (None, None, None, "Pet form of Christopher or Katherine"),
 "Marlowe": (None, None, None, "Land left by a drained lake"),
 "Remy": (None, None, None, "From Latin Remigius, 'oarsman'"),
 "Riley": (None, None, "Irish / English", "Often given as 'valiant'; also English 'rye clearing'"),
 "Sasha": (None, None, None, "Pet form of Alexander or Alexandra, 'defender of men'"),
 "Shiloh": (None, None, None, "Uncertain; often given as 'tranquil'"),
 "Sutton": (None, None, None, "Southern settlement"),
 "Tatum": (None, None, None, "From an English place name, 'Tata's homestead'"),
 "Zion": (None, None, None, "The hill of Jerusalem; meaning uncertain"),
 "Rowan": (None, None, None, "Little red-haired one; also the rowan tree"),
 "Robin": (None, None, None, "Pet form of Robert, 'bright fame'; also the bird"),
})
PROSE = [
 ("Originally a surname, now top 20 for girls", "Originally a surname, now widely used for girls"),
 ("One of the fastest-rising unisex names", "Used for both boys and girls"),
 ("Gaining popularity rapidly", "A quiet, literary choice"),
 ("Rising fast for both genders", "Used for both boys and girls"),
]
