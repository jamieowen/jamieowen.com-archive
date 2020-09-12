import { FC } from 'react';
import { TextColumnLeft, TextColumnRight } from '../components/TextColumns';

export default function Home() {
  return (
    <div>

      <TextColumnLeft
        heading="Hello"
        body="I'm Jamie, a Creative Dev based in London"
      />

      <TextColumnRight
        heading="I Build"
        body="alskdasdas"
      />

      <TextColumnLeft
        heading="Build"
        body="4342323"
      />      
      
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse convallis consectetur tortor, ut ultricies elit commodo at. Donec imperdiet interdum nulla, ultricies laoreet tellus volutpat rutrum. Proin eget efficitur velit, at condimentum quam. Sed ornare, eros at consequat tempus, arcu nunc venenatis sapien, eget luctus augue odio imperdiet urna. Fusce porta metus gravida, tincidunt mi ut, fermentum tellus. </p>

      <p>Nulla malesuada <em>laoreet nisi</em>, nec <b>molestie</b> ipsum laoreet in. Sed nibh purus, <strong>porttitor</strong> eu ligula vitae, finibus tempus felis. Donec imperdiet quam nec magna commodo, non cursus ex semper. Duis euismod nunc a lacinia scelerisque. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>

      <p>Donec sodales id orci at tempus. Nunc sit amet lectus quis velit finibus facilisis at a urna. Integer sit amet eros sollicitudin, efficitur augue posuere, ornare mauris. Donec suscipit diam eu auctor fringilla. Curabitur et vestibulum nibh, elementum aliquam tellus.</p>

      <p>Pellentesque hendrerit, mi fringilla rhoncus luctus, sem ex dignissim felis, in vestibulum quam sapien in tellus. Quisque sit amet ex eu magna ornare commodo eget sit amet turpis. Aliquam vitae magna eros. Mauris condimentum dapibus mollis. In nibh sapien, ultrices eu ex at, porta tristique neque. Morbi ullamcorper turpis diam, sed dignissim mauris lacinia sit amet.</p>      
      
    </div>
  )
}
