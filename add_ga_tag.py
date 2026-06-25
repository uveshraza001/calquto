"""
Calquto — Add Google Analytics GA4 tag to all HTML files
Run this from the ROOT of your calquto GitHub repo folder:
    python add_ga_tag.py
"""

import os
import glob

GA_TAG = """<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YPVR518XBT"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-YPVR518XBT');
</script>"""

# Find all HTML files in root and tools/ folder
html_files = glob.glob("*.html") + glob.glob("tools/*.html")

updated = 0
skipped = 0
already_has = 0

for filepath in html_files:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Skip if GA tag already present
    if "G-YPVR518XBT" in content:
        already_has += 1
        print(f"⏭️  Already has GA: {filepath}")
        continue

    # Insert after <head> tag
    if "<head>" in content:
        new_content = content.replace("<head>", "<head>\n" + GA_TAG, 1)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        updated += 1
        print(f"✅ Updated: {filepath}")
    else:
        skipped += 1
        print(f"⚠️  No <head> found, skipped: {filepath}")

print(f"\n{'='*40}")
print(f"✅ Updated:        {updated} files")
print(f"⏭️  Already had GA: {already_has} files")
print(f"⚠️  Skipped:        {skipped} files")
print(f"{'='*40}")
print("\nDone! Now commit and push all changes to GitHub.")
