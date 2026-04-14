import re

puff_items = """
        { 
          name: 'JNR Falcon', 
          price: '15€', 
          image: '/products/puff_jnr_falcon_30k_generated.png', 
          badge: 'Premium',
          flavors: ['Blueberry Raspberry Cherry']
        },
        { 
          name: 'Aerox 32k', 
          price: '15€', 
          image: '/products/puff_aerox_strawberry_kiwi_1775589080131.png', 
          badge: 'Intense',
          flavors: ['Strawberry Kiwi', 'Blue Razz Cherry', 'Blueberry Pomegranate Ice', 'Mixed Berries']
        },
        { 
          name: 'Kong Max 30k', 
          price: '15€', 
          image: '/products/puff_aerox_strawberry_kiwi_1775589080131.png', 
          badge: 'Frais',
          flavors: ['Raspberry Watermelon Ice', 'Raspberry Watermelon']
        },
        { 
          name: 'Crown Bar 30k', 
          price: '20€', 
          image: '/products/puff_fumot_leopard_1775589133707.png', 
          badge: 'Glacé',
          flavors: ['Ice Blue', 'Magic Love', 'Lemon Mint', 'Lemon Lime Cherry Fizz', 'Strawberry Punch', 'Mixed Berry']
        },
        { 
          name: 'Razz Bar 30k+', 
          price: '20€', 
          image: '/products/puff_razzbar_blueberry_1775589118962.png', 
          badge: 'Premium',
          flavors: ['Blueberry Sour Raspberry', 'Strawberry Watermelon', 'Pineapple Mango', 'Strawberry Banana', 'Strawberry Ice']
        }
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
    print("Successfully grouped puffs items.")
else:
    print("Could not locate puffs items array.")
