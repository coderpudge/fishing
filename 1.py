import os
import sys
import os.path
import shutil
import PIL.Image

# fileName = raw_input('/Users/xin/Downloads/diaoyukanpiao_an/assets/pack/pack.atlas')

# if fileName.find('.png') != -1:
#     fileName = fileName[:-4]


fileName = '/Users/xin/Downloads/diaoyukanpiao_an/assets/pack'

curPath = os.getcwd()

aim_path = os.path.join(curPath, fileName)
print aim_path
newPath = aim_path+"/newPack"
if not os.path.isdir(aim_path):
    #     shutil.rmtree(aim_path,True)
    os.makedirs(newPath)
atlasName = fileName + '/pack.atlas'
atlas = file(atlasName, "r");

while True:
    print "start--"
    line1 = atlas.readline()
    if len(line1.replace("\n","")) == 0:
        pname = atlas.readline();
        if len(pname.replace("\n","")) == 0:
            break
        sizename = atlas.readline();
        formatname = atlas.readline();
        filtername = atlas.readline();
        repeatname = atlas.readline();
        pngName = aim_path + "/" + pname
        pack_path = newPath + "/" +pname.split(".")[0]
        if not os.path.isdir(pack_path):
            os.makedirs(pack_path)
        big_image = PIL.Image.open(pngName.replace("\n",""))

    else:
        line2 = atlas.readline() # rotate
        line3 = atlas.readline() # xy
        line4 = atlas.readline() # size
        line5 = atlas.readline() # orig
        lsplit = line5.split(":")[0]
        # print lsplit
        # print lsplit.startswith('split')
        if 'split' in line5:
            line5 = atlas.readline()
        line6 = atlas.readline() # offset
        line7 = atlas.readline() # index
        
        name = line1.replace("\n","") + ".png";
        print line1
        print line2
        print line3
        print line4
        print line5
        print line6
        print line7
        args = line4.split(":")[1].split(",");
        width = int(args[0])
        height= int(args[1])
            
        args = line3.split(":")[1].split(",");
        ltx = int(args[0])
        lty = int(args[1])
            
        rbx = ltx+width
        rby = lty+height
        
        print name,width,height,ltx,lty,rbx,rby

        result_image = PIL.Image.new("RGBA", (width,height), (0,0,0,0))
        rect_on_big = big_image.crop((ltx,lty,rbx,rby))
        print(rect_on_big)
        result_image.paste(rect_on_big, (0,0,width,height))
        print "name"+name
        forders = name.split("/")
        forder_path = ""
        for index in range(len(forders)):
            print index 
            if index != len(forders)-1:
                forder_path = forder_path +"/"+ forders[index]
                if not os.path.isdir(pack_path+'/'+forder_path):
                    print pack_path+'/'+forder_path
                    os.makedirs(pack_path+'/'+forder_path)
        
        newName = forders[len(forders)-1]
        result_image.save(pack_path+'/'+forder_path+"/"+newName)
    print "end--"
atlas.close()
del big_image
