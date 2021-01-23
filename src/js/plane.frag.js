export default `
uniform sampler2D uTexture;
varying vec3 vTextureCoord;
varying vec2 vUv;

void main() {
    // vec4 pixel =  texture2D(uTexture, vTextureCoord.xy);
    vec4 pixel =  texture2D(uTexture, vec2(vTextureCoord.xy/ vTextureCoord.z));
    // vec4 pixel =  texture2D(uTexture, vUv);
    gl_FragColor = pixel;
}
`;
