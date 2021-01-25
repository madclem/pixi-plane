export default `
uniform sampler2D uTexture;
uniform float uAlpha;
varying vec3 vTextureCoord;

void main() {
    // vec4 pixel =  texture2D(uTexture, vTextureCoord.xy);
    vec4 pixel =  texture2D(uTexture, vec2(vTextureCoord.xy / vTextureCoord.z));
    gl_FragColor = pixel;
    gl_FragColor *= uAlpha;
}
`;
