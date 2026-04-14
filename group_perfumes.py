import re

parfums_homme_items = """
        { 
          name: 'Collection Lattafa', 
          price: '35€', 
          image: '/products/parfum_fakhar_corrected_1775591618834.png', 
          badge: 'Iconique',
          flavors: ['Fakhar', 'Fakhar Gold', 'Khamrah', 'Confidential Gold', 'Éclair', 'Ajwad 60ml']
        },
        { 
          name: 'Collection Volaré Homme', 
          price: '35€', 
          image: '/products/parfum_volare_prideful_1775592377311.png', 
          badge: 'Élégant',
          flavors: ['Prideful', 'Closer With You', 'Esta Puro']
        },
        { 
          name: 'Collection Loui Martin', 
          price: '35€', 
          image: '/products/imagique___parfum_mixte_loui_martin_100ml_processed.png', 
          badge: 'Premium',
          flavors: ['Imagique', 'Specific Breez', 'Ombre Rêvante', 'Rêve Infini', 'Vanilla Powdery']
        },
        { 
          name: 'Collection Gulf Orchid', 
          price: '35€', 
          image: '/products/parfum_gulf_orchid_rosso_1775591638969.png', 
          badge: 'Rare',
          flavors: ['Rosso Lychee', 'Cotton Candy Musk 60ml', 'Blueberry Musk 60ml', 'Vanilla Latte', 'Sweet Heaven Cherry']
        },
        { 
          name: 'Collection Paris Corner', 
          price: '35€', 
          image: '/products/december_vanilla_parfum_mixte_paris_corner_85ml_processed.png', 
          badge: 'Doux',
          flavors: ['December Vanilla 85ml', 'Khair Peach Delulu']
        },
        { 
          name: 'Ameerat Al Arab', 
          price: '35€', 
          image: '/products/parfum_ameerat_corrected_1775591719341.png', 
          badge: 'Royal'
        },
        { 
          name: 'Léonie Intense', 
          price: '35€', 
          image: '/products/parfum_leonie_1775591655798.png', 
          badge: 'Exclusif'
        },
        { 
          name: 'Salvo Maison Alhambra', 
          price: '35€', 
          image: '/products/salvo_maison_alhambra_processed.png', 
          badge: 'NEW'
        },
        { 
          name: 'Collection Gulf Fragrance', 
          price: '35€', 
          image: '/products/rosso_lychee_parfum_mixte_gulf_fragrance_100ml_processed.png', 
          badge: 'NEW',
          flavors: ['Rosso Lychee Mixte']
        },
        { 
          name: 'Kaharmaneh Boutique', 
          price: '35€', 
          image: '/products/kaharmaneh_new___parfum_mixte_boutique_100ml_processed.png', 
          badge: 'NEW'
        },
        { 
          name: 'Barakkat Amber Night', 
          price: '35€', 
          image: '/products/barakkat_amber_night___parfum_mixte_100ml_processed.png', 
          badge: 'NEW'
        },
        { 
          name: 'Sugar Rush Extrait', 
          price: '35€', 
          image: '/products/sugar_rush_extrait_de_parfum_processed.png', 
          badge: 'Intense'
        }
"""

parfums_femme_items = """
        { 
          name: 'Collection Yara Lattafa', 
          price: '35€', 
          image: '/products/parfum_lattafa_yara_candy_1775592421301.png', 
          badge: 'Gourmand',
          flavors: ['Candy', 'Rose', 'Classique']
        },
        { 
          name: 'Collection Kenzie Volaré', 
          price: '35€', 
          image: '/products/parfum_volare_kenzie_1775592394045.png', 
          badge: 'Rêve',
          flavors: ['Marshmallow Dream', 'Exotic Apple Crush', 'Candid Vanilla']
        },
        { 
          name: 'Collection Ameerat Al Arab', 
          price: '35€', 
          image: '/products/parfum_ameerat_corrected_1775591719341.png', 
          badge: 'Floral',
          flavors: ['Prive Rose', 'Rouge Asdaaf', 'Sugar Crown Asdaaf']
        },
        { 
          name: 'Collection Musk', 
          price: '35€', 
          image: '/products/parfum_musk_collection_1775591701197.png', 
          badge: 'Frais',
          flavors: ['Cotton Candy 60ml', 'Blueberry 60ml']
        },
        { 
          name: 'Collection Gulf Fragrance', 
          price: '35€', 
          image: '/products/rose_bonbon___parfum_femme_gulf_fragrance_100ml_processed.png', 
          badge: 'Doux',
          flavors: ['Rose Bonbon', 'Rosso Lychee Mixte']
        },
        { 
          name: 'Collection Khair Paris Corner', 
          price: '35€', 
          image: '/products/khair_confection_parfum_femme_paris_corner_100ml_processed.png', 
          badge: 'Premium',
          flavors: ['Confection', 'Peach Delulu Mixte', 'December Vanilla 85ml']
        },
        { 
          name: 'Collection Lattafa Femme', 
          price: '35€', 
          image: '/products/mayar___eau_de_parfum_femme_lattafa_100ml_processed.png', 
          badge: 'NEW',
          flavors: ['Mayar', 'Fakhar Rose Gold', 'Ajwad 60ml', 'Khamrah', 'Confidential Gold', 'Éclair']
        },
        { 
          name: 'Collection Loui Martin Mixte', 
          price: '35€', 
          image: '/products/imagique___parfum_mixte_loui_martin_100ml_processed.png', 
          badge: 'Premium',
          flavors: ['Imagique', 'Specific Breez', 'Ombre Rêvante', 'Rêve Infini', 'Vanilla Powdery']
        },
        { 
          name: 'La Vivacité Maison Alhambra', 
          price: '35€', 
          image: '/products/parfum_alhambra_vivacite_1775592440080.png', 
          badge: 'Vibrant'
        },
        { 
          name: 'Léonie Intense Alhambra', 
          price: '35€', 
          image: '/products/l_onie_intense___parfum_femme_alhambra_100ml_processed.png', 
          badge: 'NEW'
        },
        { 
          name: 'Rave Now Women Lattafa', 
          price: '35€', 
          image: '/products/parfum_rave_now_1775592456747.png', 
          badge: 'Moderne'
        },
        { 
          name: 'Aïsha Absolue Collection Privée', 
          price: '35€', 
          image: '/products/parfum_aisha_1775589064630.png', 
          badge: 'Magique'
        },
        { 
          name: 'Prideful Volaré', 
          price: '35€', 
          image: '/products/prideful___eau_de_parfum_femme_volare_100ml_processed.png', 
          badge: 'NEW'
        },
        { 
          name: 'Sweet Heaven Cherry Gulf Orchid', 
          price: '35€', 
          image: '/products/sweet_heaven_cherry_parfum_gulf_orchid_100ml_processed.png', 
          badge: 'NEW'
        },
        { 
          name: 'Kaharmaneh Mixte Boutique', 
          price: '35€', 
          image: '/products/kaharmaneh_new___parfum_mixte_boutique_100ml_processed.png', 
          badge: 'NEW'
        },
        { 
          name: 'Barakkat Amber Night', 
          price: '35€', 
          image: '/products/barakkat_amber_night___parfum_mixte_100ml_processed.png', 
          badge: 'NEW'
        },
        { 
          name: 'Sugar Rush Extrait', 
          price: '35€', 
          image: '/products/sugar_rush_extrait_de_parfum_processed.png', 
          badge: 'NEW'
        }
"""

path = "src/pages/Category.jsx"

with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace parfums-homme items
homme_pattern = r"(parfums-homme': \{[\s\S]*?items: \[\n)([\s\S]*?)(\n\s*\],\n\s*\},)"
match_homme = re.search(homme_pattern, content)
if match_homme:
    content = content[:match_homme.start(2)] + parfums_homme_items.strip("\n") + content[match_homme.end(2):]

# Replace parfums-femme items
femme_pattern = r"(parfums-femme': \{[\s\S]*?items: \[\n)([\s\S]*?)(\n\s*\],\n\s*\},)"
match_femme = re.search(femme_pattern, content)
if match_femme:
    content = content[:match_femme.start(2)] + parfums_femme_items.strip("\n") + content[match_femme.end(2):]

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Successfully grouped perfumes.")
