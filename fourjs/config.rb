# encoding: utf-8

css_dir = "css"
sass_dir = "scss"
images_dir = "img"
javascripts_dir = "js"
relative_assets = true
output_style = :compressed
sass_options = { :debug_info => true }

# Make a copy of sprites with a name that has no uniqueness of the hash.
# on_sprite_saved do |filename|
#   if File.exists?(filename)
#     FileUtils.cp filename, filename.gsub(%r{-s[a-z0-9]{10}\.png$}, '.png')
#     FileUtils.rm_rf(filename)
#   end
# end
 
# Replace in stylesheets generated references to sprites
# by their counterparts without the hash uniqueness.
# on_stylesheet_saved do |filename|
#   if File.exists?(filename)
#     css = File.read filename
#     File.open(filename, 'w+') do |f|
#       f << css.gsub(%r{-s[a-z0-9]{10}\.png}, '.png')
#     end
#   end
# end