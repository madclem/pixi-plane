export default `
attribute vec3 aVertexPosition;
attribute vec3 aTextureCoord;

uniform mat3 awesomeMatrix;
uniform mat3 uTextureMatrix;
uniform mat3 projectionMatrix;
uniform mat3 translationMatrix;
varying vec3 vPos;
varying vec3 vTextureCoord;
varying vec2 vUv;
uniform vec4 inputSize;
uniform vec4 outputFrame;

vec2 filterTextureCoord( void )
{
    return aVertexPosition.xy * (outputFrame.zw * inputSize.zw);
}

void main() {
    vec3 p =   aVertexPosition;

    float w = (p.x * awesomeMatrix[2][0] + p.y * awesomeMatrix[2][1] + awesomeMatrix[2][2] );
    vec3 newCoord = vec3(1.);

    if(w != 0.0){
      newCoord.x = (p.x*awesomeMatrix[0][0] + p.y*awesomeMatrix[0][1] + awesomeMatrix[0][2]) / w;
      newCoord.y = (p.x*awesomeMatrix[1][0] + p.y*awesomeMatrix[1][1] + awesomeMatrix[1][2]) / w;
    }
    else
    {
      newCoord.x = p.x;
      newCoord.y = p.y;
    }

    vec3 finalPos = projectionMatrix * translationMatrix * newCoord ;
    gl_Position =   vec4(finalPos.xy, 0., 1.);
    

    vPos = aVertexPosition * translationMatrix;

    
    vTextureCoord = uTextureMatrix * aTextureCoord.xyz;
    // vTextureCoord = vec3(filterTextureCoord(), 0.);
    vUv = aTextureCoord.xy;

    
}
`;
