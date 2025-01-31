

const editImage = () => {
    const [image, setImage] = useState(
        'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg',
      );

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImage(reader.result);
            updateImage(file);
          };
          reader.readAsDataURL(file);
        }
      };

    <section>
        <form>
            <img src={image} alt="" className="image-display" />
            <input type="file" accept="image/*" onChange={handleFileChange} />
        </form>
    </section>
}

export default editImage