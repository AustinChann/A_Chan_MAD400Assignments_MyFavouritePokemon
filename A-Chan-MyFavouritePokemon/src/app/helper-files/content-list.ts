class ContentList {

  static contentCount = 0;
  //Declare array of type Content
  private _contentArray: Content[];

  /**
   * Constructor
   * @param contentArray set to an empty array upon initialization
   */
  constructor(contentArray: Content[]) {
    this._contentArray = [];
    this._contentArray = contentArray;
    this.addContent();

  }

  /**
   * Getter
   */
  get contentArray(): Array<Content> {
    return this._contentArray;
  }

  /**
   * Function to another content object to the array
   */
  addContent() {
    return ++ContentList.contentCount;
  }

  /**
   * Return the size of the array
   */
  size() {
    return this._contentArray.length;
  }

  /**
   * Return the content information at specified index or throw an error if index out of bounds
   * @param index in array
   */
  displayContent(index: number) {
    if(index > this.size()) {
      console.error()
    } else {
      console.log(this.contentArray[index]);
    }
  }
}
