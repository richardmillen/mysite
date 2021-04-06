# mysite

richardmillen.github.io

## Mesh Problems

First of all, welcome to BabylonJS! We are happy to help you with questions as you are working on your game. What you are seeing is that your mesh is writing into the transparent queue as Max saw there was alpha values on your material and vertices and placed it into the transparent queue. When you have a complex mesh in the transparent queue, you will see sorting errors as it does not have the benefit of a depth buffer and does not know what face should be in front in all viewing angles. Here are a few things you can do:

I would suggest exporting your files from Max as a glTF file as you can load that directly in BabylonJS, but also take advantage of the many glTF viewers that are available like the BabylonJS Sandbox (https://sandbox.babylonjs.com/), Mixed Reality Viewer for Windows, Sketchfab, etc. This gives you a way to debug what is happening in your mesh by being able to see how several renderers deal with the file. If you see your issue pop up in one of the other renderers, you know the issue is in the file. 

I would avoid placing color on your vertices unless you really need to for some reason. It's much easier and will create a smaller file to assign materials to your meshes. If you have alpha on your vertices, you will end up with the mesh in the transparent queue as the exporter will see the alpha and set the alpha mode accordingly.

To set up your materials correctly in Max, refer to the docs at http://doc.babylonjs.com/resources/3dsmax_to_gltf#pbr-materials for reference. You will need to make sure that your transparency weight is set to none to make sure you output your model in the opaque queue.

If you still have an issue with the export to glTF, you can easily open the glTF file in an editor like VSCode (https://code.visualstudio.com/) and quickly change the alpha mode to the correct format which is detailed on this page:   https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#alpha-coverage

VSCode is also another place that can view your glTF file by adding the glTF extension. You can search for glTF in the extensions tab and you will find it. 

If you need your asset to be double-sided, you can add the double-sided property into your glTF manually: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#double-sided and an example can be found in https://github.com/KhronosGroup/glTF-Sample-Models/blob/master/2.0/FlightHelmet/glTF/FlightHelmet.gltf line 535. 

There is a blog post I wrote about the art pipeline into glTF, which is a little dated now and I am working on an update. It shows how you can even export your glTF directly from Substance Painter if you like. You can find it at https://www.khronos.org/blog/art-pipeline-for-gltf

Let me know if anything here does not make sense or if you have further questions about your asset creation. Take care!


## Keyboard Configurations

ROBLOX
------

W/Up: walk forward
S/Down: walk back
A: walk or strafe left
D: walk or strafe right
LClick: select tools
1-9: select tools (numbered along bottom of screen)
Left/Right/RClick: rotate scene
I/O/Mouse Wheel: zoom in/out

COMMON
------

ctrl: crouch or sneak
LClick: primary attack
RClick: secondary attack
shift: run
E or F: activate
R: reload
alt/tab/Q: special attack
caps lock: toggle run
1-9/F1-F12: item switching
~: console
I: inventory
J: journal
M: map
Z/X/C: weapon mode
V/G/B: extra modes
T/Y: chat/team chat
(use more distant keys for less frequent)


## Playgrounds

- [Walk Around and Look Around](https://playground.babylonjs.com/#CTCSWQ#1)




