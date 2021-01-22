export default `
uniform sampler2D uTexture;
varying vec3 vTextureCoord;

void main() {
    vec4 pixel =  texture2D(uTexture, vec2(vTextureCoord.xy/ vTextureCoord.z));
    gl_FragColor = pixel;
}
`;
