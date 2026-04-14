import re

missing_femme = [
    {"name": "Yara Candy - Eau de Parfum Femme Lattafa 100ml", "price": "35€", "image": "/products/yara_candy___eau_de_parfum_femme_lattafa_100ml_processed.png", "badge": "NEW"},
    {"name": "Yara Rose - Eau de Parfum Femme Lattafa 100ml", "price": "35€", "image": "/products/yara_rose___eau_de_parfum_femme_lattafa_100ml_processed.png", "badge": "NEW"},
    {"name": "Ameerat El Arab Sugar Crown Parfum Asdaaf 100ml", "price": "35€", "image": "/products/ameerat_el_arab_sugar_crown_parfum_asdaaf_100ml_processed.png", "badge": "NEW"},
    {"name": "Prideful - Eau de Parfum Femme Volare 100ml", "price": "35€", "image": "/products/prideful___eau_de_parfum_femme_volare_100ml_processed.png", "badge": "NEW"},
    {"name": "Kenzie Exotic Apple Crush - Parfum Volaré 100ml", "price": "35€", "image": "/products/kenzie_exotic_apple_crush___parfum_volar__100ml_processed.png", "badge": "NEW"},
    {"name": "Kenzie Marshmallow Dream 100ml Parfum Femme Volaré", "price": "35€", "image": "/products/kenzie_marshmallow_dream_100ml_parfum_femme_volar__processed.png", "badge": "NEW"},
    {"name": "Kenzie Candid Vanilla Parfum Femme Volaré 100ml", "price": "35€", "image": "/products/kenzie_candid_vanilla_parfum_femme_volar__100ml_processed.png", "badge": "NEW"},
    {"name": "Mayar - Eau de Parfum Femme Lattafa 100ml", "price": "35€", "image": "/products/mayar___eau_de_parfum_femme_lattafa_100ml_processed.png", "badge": "NEW"},
    {"name": "Now Women - Parfum Femme Rave Lattafa 100ml", "price": "35€", "image": "/products/now_women___parfum_femme_rave_lattafa_100ml_processed.png", "badge": "NEW"},
    {"name": "Ameerat Al Arab Prive Rose Parfum Femme 100ml", "price": "35€", "image": "/products/ameerat_al_arab_prive_rose_parfum_femme_100ml_processed.png", "badge": "NEW"},
    {"name": "Ameerat Al Arab Rouge Parfum Femme Asdaaf 100ml", "price": "35€", "image": "/products/ameerat_al_arab_rouge_parfum_femme_asdaaf_100ml_processed.png", "badge": "NEW"},
    {"name": "Fakhar Lattafa Rose Gold - Parfum Femme 100ml", "price": "35€", "image": "/products/fakhar_lattafa_rose_gold___parfum_femme_100ml_processed.png", "badge": "NEW"},
    {"name": "Rose Bonbon - Parfum Femme Gulf Fragrance 100ml", "price": "35€", "image": "/products/rose_bonbon___parfum_femme_gulf_fragrance_100ml_processed.png", "badge": "NEW"},
    {"name": "Léonie Intense - Parfum Femme Alhambra 100ml", "price": "35€", "image": "/products/l_onie_intense___parfum_femme_alhambra_100ml_processed.png", "badge": "NEW"},
    {"name": "Khair Confection Parfum Femme Paris Corner 100ml", "price": "35€", "image": "/products/khair_confection_parfum_femme_paris_corner_100ml_processed.png", "badge": "NEW"}
]

missing_mixte = [
    {"name": "Rosso Lychee Parfum Mixte Gulf Fragrance 100ml", "price": "35€", "image": "/products/rosso_lychee_parfum_mixte_gulf_fragrance_100ml_processed.png", "badge": "NEW"},
    {"name": "Cotton Candy Musk Parfum Mixte Gulf Orchid 60ml", "price": "35€", "image": "/products/cotton_candy_musk_parfum_mixte_gulf_orchid_60ml_processed.png", "badge": "NEW"},
    {"name": "Blueberry Musk - Parfum Mixte Gulf Orchid 60ml", "price": "35€", "image": "/products/blueberry_musk___parfum_mixte_gulf_orchid_60ml_processed.png", "badge": "NEW"},
    {"name": "December Vanilla Parfum Mixte Paris Corner 85ml", "price": "35€", "image": "/products/december_vanilla_parfum_mixte_paris_corner_85ml_processed.png", "badge": "NEW"},
    {"name": "Ajwad - Parfum Mixte Lattafa 60ml", "price": "35€", "image": "/products/ajwad___parfum_mixte_lattafa_60ml_processed.png", "badge": "NEW"},
    {"name": "Kaharmaneh New - Parfum Mixte Boutique 100ml", "price": "35€", "image": "/products/kaharmaneh_new___parfum_mixte_boutique_100ml_processed.png", "badge": "NEW"},
    {"name": "Khair Peach Delulu Parfum Mixte Paris Corner 100ml", "price": "35€", "image": "/products/khair_peach_delulu_parfum_mixte_paris_corner_100ml_processed.png", "badge": "NEW"},
    {"name": "Vanilla Latte - Parfum Mixte Gulf Orchid 100ml", "price": "35€", "image": "/products/vanilla_latte___parfum_mixte_gulf_orchid_100ml_processed.png", "badge": "NEW"},
    {"name": "Fakhar Gold - Parfum Mixte Lattafa 100ml", "price": "35€", "image": "/products/fakhar_gold___parfum_mixte_lattafa_100ml_processed.png", "badge": "NEW"},
    {"name": "Vanilla Powdery Parfum Mixte Louis Martin 100ml", "price": "35€", "image": "/products/vanilla_powdery_parfum_mixte_louis_martin_100ml_processed.png", "badge": "NEW"},
    {"name": "Khamrah - Parfum Mixte Lattafa 100ml", "price": "35€", "image": "/products/khamrah___parfum_mixte_lattafa_100ml_processed.png", "badge": "badge"},
    {"name": "Confidential Gold - Parfum Mixte Lattafa 100ml", "price": "35€", "image": "/products/confidential_gold___parfum_mixte_lattafa_100ml_processed.png", "badge": "NEW"},
    {"name": "Éclair - Parfum Mixte Lattafa 100ml", "price": "35€", "image": "/products/_clair___parfum_mixte_lattafa_100ml_processed.png", "badge": "NEW"},
    {"name": "Barakkat Amber Night - Parfum Mixte 100ml", "price": "35€", "image": "/products/barakkat_amber_night___parfum_mixte_100ml_processed.png", "badge": "NEW"},
    {"name": "Esta Puro - Parfum Mixte Volaré 100ml", "price": "35€", "image": "/products/esta_puro___parfum_mixte_volar__100ml_processed.png", "badge": "NEW"},
    {"name": "Sweet Heaven Cherry Parfum Gulf Orchid 100ml", "price": "35€", "image": "/products/sweet_heaven_cherry_parfum_gulf_orchid_100ml_processed.png", "badge": "NEW"},
    {"name": "Imagique - Parfum Mixte Loui Martin 100ml", "price": "35€", "image": "/products/imagique___parfum_mixte_loui_martin_100ml_processed.png", "badge": "NEW"},
    {"name": "Specific Breez - Parfum Mixte Loui Martin 100ml", "price": "35€", "image": "/products/specific_breez___parfum_mixte_loui_martin_100ml_processed.png", "badge": "NEW"},
    {"name": "Ombre Rêvante - Parfum Mixte Loui Martin 100ml", "price": "35€", "image": "/products/ombre_r_vante___parfum_mixte_loui_martin_100ml_processed.png", "badge": "NEW"},
    {"name": "Rêve Infini - Parfum Mixte Loui Martin 100ml", "price": "35€", "image": "/products/r_ve_infini___parfum_mixte_loui_martin_100ml_processed.png", "badge": "NEW"},
    {"name": "Sugar rush extrait de parfum", "price": "35€", "image": "/products/sugar_rush_extrait_de_parfum_processed.png", "badge": "NEW"}
]

missing_homme = [
    {"name": "Closer With You - Parfum Homme Volaré 100ml", "price": "35€", "image": "/products/closer_with_you___parfum_homme_volar__100ml_processed.png", "badge": "NEW"},
    {"name": "Salvo maison alhambra", "price": "35€", "image": "/products/salvo_maison_alhambra_processed.png", "badge": "NEW"}
]

def format_items(items):
    lines = []
    for item in items:
        safe_name = item['name'].replace("'", "\\'")
        lines.append(f"        {{ name: '{safe_name}', price: '{item['price']}', image: '{item['image']}', badge: '{item['badge']}' }}")
    return ",\n".join(lines)

with open("src/pages/Category.jsx", "r") as f:
    content = f.read()

# Append to homme
homme_addition = format_items(missing_homme + missing_mixte)
content = content.replace("badge: 'Exclusif' },", "badge: 'Exclusif' },\n" + homme_addition + ",")

# Append to femme
femme_addition = format_items(missing_femme + missing_mixte)
content = content.replace("badge: 'Frais' },", "badge: 'Frais' },\n" + femme_addition + ",")

with open("src/pages/Category.jsx", "w") as f:
    f.write(content)
