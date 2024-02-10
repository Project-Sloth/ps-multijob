
fx_version 'cerulean'

game 'gta5'

version '1.1.4'

shared_script 'config.lua'
client_script 'client/cl_*.lua'
server_scripts{
    '@oxmysql/lib/MySQL.lua',
    'server/sv_*.lua',
}

ui_page 'html/index.html'

files {
	'html/*',
}
