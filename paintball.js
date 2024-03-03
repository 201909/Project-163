AFRAME.registerComponent("paintball",{
    init:function(){
        this.shoot()
    },
    shoot:function(){
        window.addEventListener("click", (e) => {
           
              console.log("shoot ball")  

          var ball = document.createElement("a-entity")
          ball.setAttribute("geometry", {
            primitive: "sphere",
            radius: 0.1,
          });
  
          ball.setAttribute("material", "color","white")
          var cameraPosition = document.querySelector("#camera")
          var ballPos = cameraPosition.getAttribute("position")
          ball.setAttribute("position", {
            x: ballPos.x,
            y: ballPos.y,
            z: ballPos.z,
          });
          var camera = document.querySelector("#camera").object3D;
          var direction = new THREE.Vector3();
          camera.getWorldDirection(direction);
          ball.setAttribute("velocity", direction.multiplyScalar(-20));
          var scene = document.querySelector("#scene");

          ball.setAttribute("dynamic-body",{
            shape:"sphere",
            mass:0
          })
          scene.appendChild(ball)
        
        })
    },
    removeBullet: function (e) {
      console.log(e.detail.target.el);

      console.log(e.detail.body.el);
  
      //bullet element
      var element = document.querySelector("#walls");
  
      //element which is hit
      var elementHit = document.querySelector("#paintballs");
  
      if (elementHit.id.includes(elementHit)) {
        elementHit.setAttribute("material", {
          opacity: 0.5,
          transparent: true,
        });
 
        var impulse = new CANNON.Vec3(-2, 2, 1);
        var worldPoint = new CANNON.Vec3().copy(
          elementHit.getAttribute("position")
        );
  
        elementHit.body.applyImpulse(impulse, worldPoint);
  

        element.removeEventListener("collide", this.shoot);
  
        var scene = document.querySelector("#scene");
        scene.removeChild(element);
      }
    },
  
})