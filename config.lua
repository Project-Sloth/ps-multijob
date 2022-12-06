Config = Config or {}
Config.MaxJobs = 3
Config.IgnoredJobs = {
	["unemployed"] = true,
}

Config.DenyDuty = {
	["ambulance"] = true,
	["police"] = true,
}

Config.WhitelistJobs = {
	["police"] = true,
	["ambulance"] = true,
	["mechanic"] = true,
	["judge"] = true,
	["lawyer"] = true,
}

Config.Descriptions = {
	["police"] = "Shoot some criminals or maybe be a good cop and arrest them",
	["ambulance"] = "Fix the bullet holes",
	["mechanic"] = "Fix the bullet holes",
	["tow"] = "Pickup the tow truck and steal some vehicles",
	["taxi"] = "You should retire, this job sucks",
	["bus"] = "You should retire, this job sucks",
	["realestate"] = "Sell houses or something",
	["cardealer"] = "Sell cars or something",
	["judge"] = "Decide if people are guilty",
	["lawyer"] = "Help the good or the bad",
	["reporter"] = "Lowkey useless",
	["trucker"] = "Drive a truck",
	["garbage"] = "Drive a garbage truck",
	["vineyard"] = "Get them vines",
	["hotdog"] = "Sell them glizzys",
	["unemployed"] = "You should probably get a job",
}
