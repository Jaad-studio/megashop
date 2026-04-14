import re

puff_items = """
        { name: 'JNR Falcon 30k Blueberry Raspberry Cherry', price: '15€', image: '/products/puff_jnr_falcon_30k_generated.png', badge: 'Premium' },
        { name: 'Aerox 32k Strawberry Kiwi', price: '15€', image: '/products/puff_aerox_strawberry_kiwi_1775589080131.png', badge: 'Intense' },
        { name: 'Aerox 32k Blue Razz Cherry', price: '15€', image: '/products/puff_aerox_strawberry_kiwi_1775589080131.png', badge: 'Fruit Blanc' },
        { name: 'Aerox 32k Blueberry Pomegranate Ice', price: '15€', image: '/products/puff_aerox_strawberry_kiwi_1775589080131.png', badge: 'Glacé' },
        { name: 'Aerox 32k Mixed Berries', price: '15€', image: '/products/puff_aerox_strawberry_kiwi_1775589080131.png', badge: 'Frais' },
        { name: 'Kong Max 30k Raspberry Watermelon Ice', price: '15€', image: '/products/puff_aerox_strawberry_kiwi_1775589080131.png', badge: 'Frais' },
        { name: 'Kong Max 30k Raspberry Watermelon', price: '15€', image: '/products/puff_aerox_strawberry_kiwi_1775589080131.png', badge: 'Doux' },
        { name: 'Crown Bar 30k Ice Blue', price: '20€', image: '/products/puff_fumot_leopard_1775589133707.png', badge: 'Glacé' },
        { name: 'Crown Bar 30k Magic Love', price: '20€', image: '/products/puff_fumot_leopard_1775589133707.png', badge: 'Mystique' },
        { name: 'Crown Bar 30k Lemon Mint', price: '20€', image: '/products/puff_fumot_leopard_1775589133707.png', badge: 'Rafraîchissant' },
        { name: 'Crown Bar 30k Cherry Fizz', price: '20€', image: '/products/puff_fumot_leopard_1775589133707.png', badge: 'Pétillant' },
        { name: 'Crown Bar 30k Strawberry Punch', price: '20€', image: '/products/puff_fumot_leopard_1775589133707.png', badge: 'Puissant' },
        { name: 'Crown Bar 30k Mixed Berry', price: '20€', image: '/products/puff_fumot_leopard_1775589133707.png', badge: 'Classique' },
        { name: 'Razz Bar 30k+ Blueberry Sour Raspberry', price: '20€', image: '/products/puff_razzbar_blueberry_1775589118962.png', badge: 'Premium' },
        { name: 'Razz Bar 30k+ Strawberry Watermelon', price: '20€', image: '/products/puff_razzbar_blueberry_1775589118962.png', badge: 'Intense' },
        { name: 'Razz Bar 30k+ Pineapple Mango', price: '20€', image: '/products/puff_razzbar_blueberry_1775589118962.png', badge: 'Exotique' },
        { name: 'Razz Bar 30k+ Strawberry Banana', price: '20€', image: '/products/puff_razzbar_blueberry_1775589118962.png', badge: 'Gourmand' },
        { name: 'Razz Bar 30k+ Strawberry Ice', price: '20€', image: '/products/puff_razzbar_blueberry_1775589118962.png', badge: 'Frais' },
"""

path = "src/pages/Category.jsx"

with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace the items array inside puffs
puffs_items_pattern = r"(puffs: \{(?:[^{}]|{[^{}]*})*?items: \[\n)([\s\S]*?)(\n\s*\])"

match = re.search(puffs_items_pattern, content)
if match:
    new_content = content[:match.start(2)] + puff_items.strip("\n") + content[match.end(2):]
    with open(path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print("Successfully replaced puffs items.")
else:
    print("Could not locate puffs items array.")
