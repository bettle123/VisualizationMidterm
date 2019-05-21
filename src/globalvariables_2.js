/*
date: 04/26/2019
author: Su Ming Yi
goal: store all the States, cities, airportID information.

*/



var selectedDepState;
var selectedDepCity;
var selectedDepAirportID;
var selectedArrState;
var selectedArrCity;
var selectedArrAirportID;



// State lists
var cities = new Array();

cities['AK'] = new Array("Adak Island, AK","Anchorage, AK","Barrow, AK","Bethel, AK","Cordova, AK","Deadhorse, AK","Dillingham, AK","Fairbanks, AK","Gustavus, AK","Juneau, AK","Ketchikan, AK","King Salmon, AK","Kodiak, AK","Kotzebue, AK","Nome, AK","Petersburg, AK","Sitka, AK","Unalaska, AK","Wrangell, AK","Yakutat, AK");
cities['AL'] = new Array("Birmingham, AL","Dothan, AL","Huntsville, AL","Mobile, AL","Montgomery, AL");
cities['AR'] = new Array("Fayetteville, AR","Fort Smith, AR","Little Rock, AR","Texarkana, AR");
cities['AZ'] = new Array("Flagstaff, AZ","Phoenix, AZ","Tucson, AZ","Yuma, AZ");
cities['CA'] = new Array("Arcata/Eureka, CA","Bakersfield, CA","Burbank, CA","Fresno, CA","Long Beach, CA","Los Angeles, CA","Mammoth Lakes, CA","Monterey, CA","Oakland, CA","Ontario, CA","Palm Springs, CA","Redding, CA","Sacramento, CA","San Diego, CA","San Francisco, CA","San Jose, CA","San Luis Obispo, CA","Santa Ana, CA","Santa Barbara, CA","Santa Maria, CA","Santa Rosa, CA","Stockton, CA");
cities['CO'] = new Array("Aspen, CO","Colorado Springs, CO","Denver, CO","Durango, CO","Eagle, CO","Grand Junction, CO","Gunnison, CO","Hayden, CO","Montrose/Delta, CO","Pueblo, CO");
cities['CT'] = new Array("Hartford, CT","New Haven, CT");
cities['FL'] = new Array("Daytona Beach, FL","Fort Lauderdale, FL","Fort Myers, FL","Gainesville, FL","Jacksonville, FL","Key West, FL","Melbourne, FL","Miami, FL","Orlando, FL","Panama City, FL","Pensacola, FL","Punta Gorda, FL","Sanford, FL","Sarasota/Bradenton, FL","St. Petersburg, FL","Tallahassee, FL","Tampa, FL","Valparaiso, FL","West Palm Beach/Palm Beach, FL");
cities['GA'] = new Array("Albany, GA","Atlanta, GA","Augusta, GA","Brunswick, GA","Columbus, GA","Savannah, GA","Valdosta, GA");
cities['HI'] = new Array("Hilo, HI","Honolulu, HI","Hoolehua, HI","Kahului, HI","Kapalua, HI","Kona, HI","Lanai, HI","Lihue, HI");
cities['IA'] = new Array("Cedar Rapids/Iowa City, IA","Des Moines, IA","Dubuque, IA","Sioux City, IA","Waterloo, IA");
cities['ID'] = new Array("Boise, ID","Idaho Falls, ID","Lewiston, ID","Pocatello, ID","Sun Valley/Hailey/Ketchum, ID","Twin Falls, ID");
cities['IL'] = new Array("Belleville, IL","Bloomington/Normal, IL","Champaign/Urbana, IL","Chicago, IL","Moline, IL","Peoria, IL","Quincy, IL","Rockford, IL","Springfield, IL");
cities['IN'] = new Array("Evansville, IN","Fort Wayne, IN","Indianapolis, IN","South Bend, IN");
cities['KS'] = new Array("Garden City, KS","Hays, KS","Liberal, KS","Manhattan/Ft. Riley, KS","Salina, KS","Wichita, KS");
cities['KY'] = new Array("Cincinnati, OH","Lexington, KY","Louisville, KY","Owensboro, KY","Paducah, KY");
cities['LA'] = new Array("Alexandria, LA","Baton Rouge, LA","Lafayette, LA","Lake Charles, LA","Monroe, LA","New Orleans, LA","Shreveport, LA");
cities['MA'] = new Array("Boston, MA","Hyannis, MA","Martha's Vineyard, MA","Nantucket, MA","Worcester, MA");
cities['MD'] = new Array("Baltimore, MD","Hagerstown, MD","Salisbury, MD");
cities['ME'] = new Array("Bangor, ME","Portland, ME","Presque Isle/Houlton, ME");
cities['MI'] = new Array("Alpena, MI","Detroit, MI","Escanaba, MI","Flint, MI","Grand Rapids, MI","Hancock/Houghton, MI","Iron Mountain/Kingsfd, MI","Kalamazoo, MI","Lansing, MI","Marquette, MI","Muskegon, MI","Pellston, MI","Saginaw/Bay City/Midland, MI","Sault Ste. Marie, MI","Traverse City, MI");
cities['MN'] = new Array("Bemidji, MN","Brainerd, MN","Duluth, MN","Hibbing, MN","International Falls, MN","Minneapolis, MN","Rochester, MN","St. Cloud, MN");
cities['MO'] = new Array("Branson, MO","Cape Girardeau, MO","Columbia, MO","Joplin, MO","Kansas City, MO","Springfield, MO","St. Louis, MO");
cities['MS'] = new Array("Columbus, MS","Gulfport/Biloxi, MS","Hattiesburg/Laurel, MS","Jackson/Vicksburg, MS","Meridian, MS");
cities['MT'] = new Array("Billings, MT","Bozeman, MT","Butte, MT","Great Falls, MT","Helena, MT","Kalispell, MT","Missoula, MT","West Yellowstone, MT");
cities['NC'] = new Array("Asheville, NC","CONCORD, NC","Charlotte, NC","Fayetteville, NC","Greensboro/High Point, NC","Greenville, NC","Jacksonville/Camp Lejeune, NC","New Bern/Morehead/Beaufort, NC","Raleigh/Durham, NC","Wilmington, NC");
cities['ND'] = new Array("Bismarck/Mandan, ND","Devils Lake, ND","Dickinson, ND","Fargo, ND","Grand Forks, ND","Jamestown, ND","Minot, ND","Williston, ND");
cities['NE'] = new Array("Grand Island, NE","Lincoln, NE","North Platte, NE","Omaha, NE","Scottsbluff, NE");
cities['NH'] = new Array("Manchester, NH","Portsmouth, NH");
cities['NJ'] = new Array("Atlantic City, NJ","Newark, NJ","Trenton, NJ");
cities['NM'] = new Array("Albuquerque, NM","Hobbs, NM","Roswell, NM","Santa Fe, NM");
cities['NV'] = new Array("Elko, NV","Las Vegas, NV","Reno, NV");
cities['NY'] = new Array("Albany, NY","Binghamton, NY","Buffalo, NY","Elmira/Corning, NY","Islip, NY","Ithaca/Cortland, NY","New York, NY","Newburgh/Poughkeepsie, NY","Niagara Falls, NY","Ogdensburg, NY","Plattsburgh, NY","Rochester, NY","Syracuse, NY","Watertown, NY","White Plains, NY");
cities['OH'] = new Array("Akron, OH","Cleveland, OH","Columbus, OH","Dayton, OH","Toledo, OH");
cities['OK'] = new Array("Lawton/Fort Sill, OK","Oklahoma City, OK","Stillwater, OK","Tulsa, OK");
cities['OR'] = new Array("Bend/Redmond, OR","Eugene, OR","Medford, OR","North Bend/Coos Bay, OR","Portland, OR");
cities['PA'] = new Array("Allentown/Bethlehem/Easton, PA","Erie, PA","Harrisburg, PA","Latrobe, PA","Philadelphia, PA","Pittsburgh, PA","Scranton/Wilkes-Barre, PA","State College, PA","Williamsport, PA");
cities['PR'] = new Array("Aguadilla, PR","Ponce, PR","San Juan, PR");
cities['RI'] = new Array("Providence, RI");
cities['SC'] = new Array("Charleston, SC","Columbia, SC","Florence, SC","Greer, SC","Hilton Head, SC","Myrtle Beach, SC");
cities['SD'] = new Array("Aberdeen, SD","Rapid City, SD","Sioux Falls, SD");
cities['TN'] = new Array("Bristol/Johnson City/Kingsport, TN","Chattanooga, TN","Knoxville, TN","Memphis, TN","Nashville, TN");
cities['TT'] = new Array("Guam, TT","Pago Pago, TT","Saipan, TT");
cities['TX'] = new Array("Abilene, TX","Amarillo, TX","Austin, TX","Beaumont/Port Arthur, TX","Brownsville, TX","College Station/Bryan, TX","Corpus Christi, TX","Dallas, TX","Dallas/Fort Worth, TX","El Paso, TX","Harlingen/San Benito, TX","Houston, TX","Killeen, TX","Laredo, TX","Longview, TX","Lubbock, TX","Midland/Odessa, TX","Mission/McAllen/Edinburg, TX","San Angelo, TX","San Antonio, TX","Tyler, TX","Waco, TX","Wichita Falls, TX");
cities['UT'] = new Array("Cedar City, UT","Moab, UT","Ogden, UT","Provo, UT","Salt Lake City, UT","St. George, UT","Vernal, UT");
cities['VA'] = new Array("Charlottesville, VA","Lynchburg, VA","Newport News/Williamsburg, VA","Norfolk, VA","Richmond, VA","Roanoke, VA","Staunton, VA","Washington, DC");
cities['VI'] = new Array("Charlotte Amalie, VI","Christiansted, VI");
cities['VT'] = new Array("Burlington, VT");
cities['WA'] = new Array("Bellingham, WA","Pasco/Kennewick/Richland, WA","Pullman, WA","Seattle, WA","Spokane, WA","Walla Walla, WA","Wenatchee, WA","Yakima, WA");
cities['WI'] = new Array("Appleton, WI","Eau Claire, WI","Green Bay, WI","La Crosse, WI","Madison, WI","Milwaukee, WI","Mosinee, WI","Rhinelander, WI");
cities['WV'] = new Array("Ashland, WV","Charleston/Dunbar, WV","Clarksburg/Fairmont, WV","Lewisburg, WV");
cities['WY'] = new Array("Casper, WY","Cody, WY","Gillette, WY","Jackson, WY","Laramie, WY","Rock Springs, WY");

// City lists

var airportID = new Array();

airportID['Aberdeen, SD'] = new Array('ABR');
airportID['Abilene, TX'] = new Array('ABI');
airportID['Adak Island, AK'] = new Array('ADK');
airportID['Aguadilla, PR'] = new Array('BQN');
airportID['Akron, OH'] = new Array('CAK');
airportID['Albany, GA'] = new Array('ABY');
airportID['Albany, NY'] = new Array('ALB');
airportID['Albuquerque, NM'] = new Array('ABQ');
airportID['Alexandria, LA'] = new Array('AEX');
airportID['Allentown/Bethlehem/Easton, PA'] = new Array('ABE');
airportID['Alpena, MI'] = new Array('APN');
airportID['Amarillo, TX'] = new Array('AMA');
airportID['Anchorage, AK'] = new Array('ANC');
airportID['Appleton, WI'] = new Array('ATW');
airportID['Arcata/Eureka, CA'] = new Array('ACV');
airportID['Asheville, NC'] = new Array('AVL');
airportID['Ashland, WV'] = new Array('HTS');
airportID['Aspen, CO'] = new Array('ASE');
airportID['Atlanta, GA'] = new Array('ATL');
airportID['Atlantic City, NJ'] = new Array('ACY');
airportID['Augusta, GA'] = new Array('AGS');
airportID['Austin, TX'] = new Array('AUS');
airportID['Bakersfield, CA'] = new Array('BFL');
airportID['Baltimore, MD'] = new Array('BWI');
airportID['Bangor, ME'] = new Array('BGR');
airportID['Barrow, AK'] = new Array('BRW');
airportID['Baton Rouge, LA'] = new Array('BTR');
airportID['Beaumont/Port Arthur, TX'] = new Array('BPT');
airportID['Belleville, IL'] = new Array('BLV');
airportID['Bellingham, WA'] = new Array('BLI');
airportID['Bemidji, MN'] = new Array('BJI');
airportID['Bend/Redmond, OR'] = new Array('RDM');
airportID['Bethel, AK'] = new Array('BET');
airportID['Billings, MT'] = new Array('BIL');
airportID['Binghamton, NY'] = new Array('BGM');
airportID['Birmingham, AL'] = new Array('BHM');
airportID['Bismarck/Mandan, ND'] = new Array('BIS');
airportID['Bloomington/Normal, IL'] = new Array('BMI');
airportID['Boise, ID'] = new Array('BOI');
airportID['Boston, MA'] = new Array('BOS');
airportID['Bozeman, MT'] = new Array('BZN');
airportID['Brainerd, MN'] = new Array('BRD');
airportID['Branson, MO'] = new Array('BKG');
airportID['Bristol/Johnson City/Kingsport, TN'] = new Array('TRI');
airportID['Brownsville, TX'] = new Array('BRO');
airportID['Brunswick, GA'] = new Array('BQK');
airportID['Buffalo, NY'] = new Array('BUF');
airportID['Burbank, CA'] = new Array('BUR');
airportID['Burlington, VT'] = new Array('BTV');
airportID['Butte, MT'] = new Array('BTM');
airportID['CONCORD, NC'] = new Array('USA');
airportID['Cape Girardeau, MO'] = new Array('CGI');
airportID['Casper, WY'] = new Array('CPR');
airportID['Cedar City, UT'] = new Array('CDC');
airportID['Cedar Rapids/Iowa City, IA'] = new Array('CID');
airportID['Champaign/Urbana, IL'] = new Array('CMI');
airportID['Charleston, SC'] = new Array('CHS');
airportID['Charleston/Dunbar, WV'] = new Array('CRW');
airportID['Charlotte Amalie, VI'] = new Array('STT');
airportID['Charlotte, NC'] = new Array('CLT');
airportID['Charlottesville, VA'] = new Array('CHO');
airportID['Chattanooga, TN'] = new Array('CHA');
airportID['Chicago, IL'] = new Array('MDW', 'ORD');
airportID['Christiansted, VI'] = new Array('STX');
airportID['Cincinnati, OH'] = new Array('CVG');
airportID['Clarksburg/Fairmont, WV'] = new Array('CKB');
airportID['Cleveland, OH'] = new Array('CLE');
airportID['Cody, WY'] = new Array('COD');
airportID['College Station/Bryan, TX'] = new Array('CLL');
airportID['Colorado Springs, CO'] = new Array('COS');
airportID['Columbia, MO'] = new Array('COU');
airportID['Columbia, SC'] = new Array('CAE');
airportID['Columbus, GA'] = new Array('CSG');
airportID['Columbus, MS'] = new Array('GTR');
airportID['Columbus, OH'] = new Array('CMH', 'LCK');
airportID['Cordova, AK'] = new Array('CDV');
airportID['Corpus Christi, TX'] = new Array('CRP');
airportID['Dallas, TX'] = new Array('DAL');
airportID['Dallas/Fort Worth, TX'] = new Array('DFW');
airportID['Dayton, OH'] = new Array('DAY');
airportID['Daytona Beach, FL'] = new Array('DAB');
airportID['Deadhorse, AK'] = new Array('SCC');
airportID['Denver, CO'] = new Array('DEN');
airportID['Des Moines, IA'] = new Array('DSM');
airportID['Detroit, MI'] = new Array('DTW');
airportID['Devils Lake, ND'] = new Array('DVL');
airportID['Dickinson, ND'] = new Array('DIK');
airportID['Dillingham, AK'] = new Array('DLG');
airportID['Dothan, AL'] = new Array('DHN');
airportID['Dubuque, IA'] = new Array('DBQ');
airportID['Duluth, MN'] = new Array('DLH');
airportID['Durango, CO'] = new Array('DRO');
airportID['Eagle, CO'] = new Array('EGE');
airportID['Eau Claire, WI'] = new Array('EAU');
airportID['El Paso, TX'] = new Array('ELP');
airportID['Elko, NV'] = new Array('EKO');
airportID['Elmira/Corning, NY'] = new Array('ELM');
airportID['Erie, PA'] = new Array('ERI');
airportID['Escanaba, MI'] = new Array('ESC');
airportID['Eugene, OR'] = new Array('EUG');
airportID['Evansville, IN'] = new Array('EVV');
airportID['Fairbanks, AK'] = new Array('FAI');
airportID['Fargo, ND'] = new Array('FAR');
airportID['Fayetteville, AR'] = new Array('XNA');
airportID['Fayetteville, NC'] = new Array('FAY');
airportID['Flagstaff, AZ'] = new Array('FLG');
airportID['Flint, MI'] = new Array('FNT');
airportID['Florence, SC'] = new Array('FLO');
airportID['Fort Lauderdale, FL'] = new Array('FLL');
airportID['Fort Myers, FL'] = new Array('RSW');
airportID['Fort Smith, AR'] = new Array('FSM');
airportID['Fort Wayne, IN'] = new Array('FWA');
airportID['Fresno, CA'] = new Array('FAT');
airportID['Gainesville, FL'] = new Array('GNV');
airportID['Garden City, KS'] = new Array('GCK');
airportID['Gillette, WY'] = new Array('GCC');
airportID['Grand Forks, ND'] = new Array('GFK');
airportID['Grand Island, NE'] = new Array('GRI');
airportID['Grand Junction, CO'] = new Array('GJT');
airportID['Grand Rapids, MI'] = new Array('GRR');
airportID['Great Falls, MT'] = new Array('GTF');
airportID['Green Bay, WI'] = new Array('GRB');
airportID['Greensboro/High Point, NC'] = new Array('GSO');
airportID['Greenville, NC'] = new Array('PGV');
airportID['Greer, SC'] = new Array('GSP');
airportID['Guam, TT'] = new Array('GUM');
airportID['Gulfport/Biloxi, MS'] = new Array('GPT');
airportID['Gunnison, CO'] = new Array('GUC');
airportID['Gustavus, AK'] = new Array('GST');
airportID['Hagerstown, MD'] = new Array('HGR');
airportID['Hancock/Houghton, MI'] = new Array('CMX');
airportID['Harlingen/San Benito, TX'] = new Array('HRL');
airportID['Harrisburg, PA'] = new Array('MDT');
airportID['Hartford, CT'] = new Array('BDL');
airportID['Hattiesburg/Laurel, MS'] = new Array('PIB');
airportID['Hayden, CO'] = new Array('HDN');
airportID['Hays, KS'] = new Array('HYS');
airportID['Helena, MT'] = new Array('HLN');
airportID['Hibbing, MN'] = new Array('HIB');
airportID['Hilo, HI'] = new Array('ITO');
airportID['Hilton Head, SC'] = new Array('HHH');
airportID['Hobbs, NM'] = new Array('HOB');
airportID['Honolulu, HI'] = new Array('HNL');
airportID['Hoolehua, HI'] = new Array('MKK');
airportID['Houston, TX'] = new Array('HOU', 'IAH');
airportID['Huntsville, AL'] = new Array('HSV');
airportID['Hyannis, MA'] = new Array('HYA');
airportID['Idaho Falls, ID'] = new Array('IDA');
airportID['Indianapolis, IN'] = new Array('IND');
airportID['International Falls, MN'] = new Array('INL');
airportID['Iron Mountain/Kingsfd, MI'] = new Array('IMT');
airportID['Islip, NY'] = new Array('ISP');
airportID['Ithaca/Cortland, NY'] = new Array('ITH');
airportID['Jackson, WY'] = new Array('JAC');
airportID['Jackson/Vicksburg, MS'] = new Array('JAN');
airportID['Jacksonville, FL'] = new Array('JAX');
airportID['Jacksonville/Camp Lejeune, NC'] = new Array('OAJ');
airportID['Jamestown, ND'] = new Array('JMS');
airportID['Joplin, MO'] = new Array('JLN');
airportID['Juneau, AK'] = new Array('JNU');
airportID['Kahului, HI'] = new Array('OGG');
airportID['Kalamazoo, MI'] = new Array('AZO');
airportID['Kalispell, MT'] = new Array('FCA');
airportID['Kansas City, MO'] = new Array('MCI');
airportID['Kapalua, HI'] = new Array('JHM');
airportID['Ketchikan, AK'] = new Array('KTN');
airportID['Key West, FL'] = new Array('EYW');
airportID['Killeen, TX'] = new Array('GRK');
airportID['King Salmon, AK'] = new Array('AKN');
airportID['Knoxville, TN'] = new Array('TYS');
airportID['Kodiak, AK'] = new Array('ADQ');
airportID['Kona, HI'] = new Array('KOA');
airportID['Kotzebue, AK'] = new Array('OTZ');
airportID['La Crosse, WI'] = new Array('LSE');
airportID['Lafayette, LA'] = new Array('LFT');
airportID['Lake Charles, LA'] = new Array('LCH');
airportID['Lanai, HI'] = new Array('LNY');
airportID['Lansing, MI'] = new Array('LAN');
airportID['Laramie, WY'] = new Array('LAR');
airportID['Laredo, TX'] = new Array('LRD');
airportID['Las Vegas, NV'] = new Array('LAS');
airportID['Latrobe, PA'] = new Array('LBE');
airportID['Lawton/Fort Sill, OK'] = new Array('LAW');
airportID['Lewisburg, WV'] = new Array('LWB');
airportID['Lewiston, ID'] = new Array('LWS');
airportID['Lexington, KY'] = new Array('LEX');
airportID['Liberal, KS'] = new Array('LBL');
airportID['Lihue, HI'] = new Array('LIH');
airportID['Lincoln, NE'] = new Array('LNK');
airportID['Little Rock, AR'] = new Array('LIT');
airportID['Long Beach, CA'] = new Array('LGB');
airportID['Longview, TX'] = new Array('GGG');
airportID['Los Angeles, CA'] = new Array('LAX');
airportID['Louisville, KY'] = new Array('SDF');
airportID['Lubbock, TX'] = new Array('LBB');
airportID['Lynchburg, VA'] = new Array('LYH');
airportID['Madison, WI'] = new Array('MSN');
airportID['Mammoth Lakes, CA'] = new Array('MMH');
airportID['Manchester, NH'] = new Array('MHT');
airportID['Manhattan/Ft. Riley, KS'] = new Array('MHK');
airportID['Marquette, MI'] = new Array('MQT');
airportID["Martha's Vineyard, MA"] = new Array('MVY');
airportID['Medford, OR'] = new Array('MFR');
airportID['Melbourne, FL'] = new Array('MLB');
airportID['Memphis, TN'] = new Array('MEM');
airportID['Meridian, MS'] = new Array('MEI');
airportID['Miami, FL'] = new Array('MIA');
airportID['Midland/Odessa, TX'] = new Array('MAF');
airportID['Milwaukee, WI'] = new Array('MKE');
airportID['Minneapolis, MN'] = new Array('MSP');
airportID['Minot, ND'] = new Array('MOT');
airportID['Mission/McAllen/Edinburg, TX'] = new Array('MFE');
airportID['Missoula, MT'] = new Array('MSO');
airportID['Moab, UT'] = new Array('CNY');
airportID['Mobile, AL'] = new Array('MOB');
airportID['Moline, IL'] = new Array('MLI');
airportID['Monroe, LA'] = new Array('MLU');
airportID['Monterey, CA'] = new Array('MRY');
airportID['Montgomery, AL'] = new Array('MGM');
airportID['Montrose/Delta, CO'] = new Array('MTJ');
airportID['Mosinee, WI'] = new Array('CWA');
airportID['Muskegon, MI'] = new Array('MKG');
airportID['Myrtle Beach, SC'] = new Array('MYR');
airportID['Nantucket, MA'] = new Array('ACK');
airportID['Nashville, TN'] = new Array('BNA');
airportID['New Bern/Morehead/Beaufort, NC'] = new Array('EWN');
airportID['New Haven, CT'] = new Array('HVN');
airportID['New Orleans, LA'] = new Array('MSY');
airportID['New York, NY'] = new Array('JFK', 'LGA');
airportID['Newark, NJ'] = new Array('EWR');
airportID['Newburgh/Poughkeepsie, NY'] = new Array('SWF');
airportID['Newport News/Williamsburg, VA'] = new Array('PHF');
airportID['Niagara Falls, NY'] = new Array('IAG');
airportID['Nome, AK'] = new Array('OME');
airportID['Norfolk, VA'] = new Array('ORF');
airportID['North Bend/Coos Bay, OR'] = new Array('OTH');
airportID['North Platte, NE'] = new Array('LBF');
airportID['Oakland, CA'] = new Array('OAK');
airportID['Ogden, UT'] = new Array('OGD');
airportID['Ogdensburg, NY'] = new Array('OGS');
airportID['Oklahoma City, OK'] = new Array('OKC');
airportID['Omaha, NE'] = new Array('OMA');
airportID['Ontario, CA'] = new Array('ONT');
airportID['Orlando, FL'] = new Array('MCO');
airportID['Owensboro, KY'] = new Array('OWB');
airportID['Paducah, KY'] = new Array('PAH');
airportID['Pago Pago, TT'] = new Array('PPG');
airportID['Palm Springs, CA'] = new Array('PSP');
airportID['Panama City, FL'] = new Array('ECP');
airportID['Pasco/Kennewick/Richland, WA'] = new Array('PSC');
airportID['Pellston, MI'] = new Array('PLN');
airportID['Pensacola, FL'] = new Array('PNS');
airportID['Peoria, IL'] = new Array('PIA');
airportID['Petersburg, AK'] = new Array('PSG');
airportID['Philadelphia, PA'] = new Array('PHL');
airportID['Phoenix, AZ'] = new Array('AZA', 'PHX');
airportID['Pittsburgh, PA'] = new Array('PIT');
airportID['Plattsburgh, NY'] = new Array('PBG');
airportID['Pocatello, ID'] = new Array('PIH');
airportID['Ponce, PR'] = new Array('PSE');
airportID['Portland, ME'] = new Array('PWM');
airportID['Portland, OR'] = new Array('PDX');
airportID['Portsmouth, NH'] = new Array('PSM');
airportID['Presque Isle/Houlton, ME'] = new Array('PQI');
airportID['Providence, RI'] = new Array('PVD');
airportID['Provo, UT'] = new Array('PVU');
airportID['Pueblo, CO'] = new Array('PUB');
airportID['Pullman, WA'] = new Array('PUW');
airportID['Punta Gorda, FL'] = new Array('PGD');
airportID['Quincy, IL'] = new Array('UIN');
airportID['Raleigh/Durham, NC'] = new Array('RDU');
airportID['Rapid City, SD'] = new Array('RAP');
airportID['Redding, CA'] = new Array('RDD');
airportID['Reno, NV'] = new Array('RNO');
airportID['Rhinelander, WI'] = new Array('RHI');
airportID['Richmond, VA'] = new Array('RIC');
airportID['Roanoke, VA'] = new Array('ROA');
airportID['Rochester, MN'] = new Array('RST');
airportID['Rochester, NY'] = new Array('ROC');
airportID['Rock Springs, WY'] = new Array('RKS');
airportID['Rockford, IL'] = new Array('RFD');
airportID['Roswell, NM'] = new Array('ROW');
airportID['Sacramento, CA'] = new Array('SMF');
airportID['Saginaw/Bay City/Midland, MI'] = new Array('MBS');
airportID['Saipan, TT'] = new Array('SPN');
airportID['Salina, KS'] = new Array('SLN');
airportID['Salisbury, MD'] = new Array('SBY');
airportID['Salt Lake City, UT'] = new Array('SLC');
airportID['San Angelo, TX'] = new Array('SJT');
airportID['San Antonio, TX'] = new Array('SAT');
airportID['San Diego, CA'] = new Array('SAN');
airportID['San Francisco, CA'] = new Array('SFO');
airportID['San Jose, CA'] = new Array('SJC');
airportID['San Juan, PR'] = new Array('SJU');
airportID['San Luis Obispo, CA'] = new Array('SBP');
airportID['Sanford, FL'] = new Array('SFB');
airportID['Santa Ana, CA'] = new Array('SNA');
airportID['Santa Barbara, CA'] = new Array('SBA');
airportID['Santa Fe, NM'] = new Array('SAF');
airportID['Santa Maria, CA'] = new Array('SMX');
airportID['Santa Rosa, CA'] = new Array('STS');
airportID['Sarasota/Bradenton, FL'] = new Array('SRQ');
airportID['Sault Ste. Marie, MI'] = new Array('CIU');
airportID['Savannah, GA'] = new Array('SAV');
airportID['Scottsbluff, NE'] = new Array('BFF');
airportID['Scranton/Wilkes-Barre, PA'] = new Array('AVP');
airportID['Seattle, WA'] = new Array('SEA');
airportID['Shreveport, LA'] = new Array('SHV');
airportID['Sioux City, IA'] = new Array('SUX');
airportID['Sioux Falls, SD'] = new Array('FSD');
airportID['Sitka, AK'] = new Array('SIT');
airportID['South Bend, IN'] = new Array('SBN');
airportID['Spokane, WA'] = new Array('GEG');
airportID['Springfield, IL'] = new Array('SPI');
airportID['Springfield, MO'] = new Array('SGF');
airportID['St. Cloud, MN'] = new Array('STC');
airportID['St. George, UT'] = new Array('SGU');
airportID['St. Louis, MO'] = new Array('STL');
airportID['St. Petersburg, FL'] = new Array('PIE');
airportID['State College, PA'] = new Array('SCE');
airportID['Staunton, VA'] = new Array('SHD');
airportID['Stillwater, OK'] = new Array('SWO');
airportID['Stockton, CA'] = new Array('SCK');
airportID['Sun Valley/Hailey/Ketchum, ID'] = new Array('SUN');
airportID['Syracuse, NY'] = new Array('SYR');
airportID['Tallahassee, FL'] = new Array('TLH');
airportID['Tampa, FL'] = new Array('TPA');
airportID['Texarkana, AR'] = new Array('TXK');
airportID['Toledo, OH'] = new Array('TOL');
airportID['Traverse City, MI'] = new Array('TVC');
airportID['Trenton, NJ'] = new Array('TTN');
airportID['Tucson, AZ'] = new Array('TUS');
airportID['Tulsa, OK'] = new Array('TUL');
airportID['Twin Falls, ID'] = new Array('TWF');
airportID['Tyler, TX'] = new Array('TYR');
airportID['Unalaska, AK'] = new Array('DUT');
airportID['Valdosta, GA'] = new Array('VLD');
airportID['Valparaiso, FL'] = new Array('VPS');
airportID['Vernal, UT'] = new Array('VEL');
airportID['Waco, TX'] = new Array('ACT');
airportID['Walla Walla, WA'] = new Array('ALW');
airportID['Washington, DC'] = new Array('DCA', 'IAD');
airportID['Waterloo, IA'] = new Array('ALO');
airportID['Watertown, NY'] = new Array('ART');
airportID['Wenatchee, WA'] = new Array('EAT');
airportID['West Palm Beach/Palm Beach, FL'] = new Array('PBI');
airportID['West Yellowstone, MT'] = new Array('WYS');
airportID['White Plains, NY'] = new Array('HPN');
airportID['Wichita Falls, TX'] = new Array('SPS');
airportID['Wichita, KS'] = new Array('ICT');
airportID['Williamsport, PA'] = new Array('IPT');
airportID['Williston, ND'] = new Array('ISN');
airportID['Wilmington, NC'] = new Array('ILM');
airportID['Worcester, MA'] = new Array('ORH');
airportID['Wrangell, AK'] = new Array('WRG');
airportID['Yakima, WA'] = new Array('YKM');
airportID['Yakutat, AK'] = new Array('YAK');
airportID['Yuma, AZ'] = new Array('YUM');
