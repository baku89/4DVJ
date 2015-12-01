import json
import os
import glob
from pprint import pprint

# jsonDir = ""

currentDir = os.path.dirname(__file__)

# -------------------------------------------------------
# make polytope graphs data
def makeGraph():
	graphDir = os.path.normpath(os.path.join(currentDir, "../data/0 - JSON"))
	destFile = os.path.normpath(os.path.join(currentDir, "./build/data/graphs.json"))
	files = glob.glob(graphDir + "/*.json")
	data = {}

	for file in files:
		base = os.path.basename(file)
		name = os.path.splitext(base)[0]
		print name
		with open(file) as srcFile:
			graph = json.load(srcFile)
			data[name] = graph

	with open(destFile, 'w') as outFile:
		json.dump(data, outFile, separators=(',',':'))



		
makeGraph()