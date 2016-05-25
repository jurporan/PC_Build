package models

import play.api.db.slick.Config.driver.simple._

case class GraphicCard(id: Int, model: String, manufacturer: String, memory: Float, frequency: Float, width: Float, height: Float, length: Float, consumption:Float,  popularity: Int)

/* Table mapping
 */
class GraphicCardTable(tag: Tag) extends Table[GraphicCard](tag, "GRAPHIC_CARD")
{
  def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)
  def model = column[String]("NAME", O.NotNUll)
  def manufacturer = column[String]("MANUFACTURER", O.NotNUll)
  def memory = column[Float]("MEMORY", O.NotNUll)
  def frequency = column[Float]("FREQUENCY", O.NotNull)
  def width = column[Float]("WIDTH", O.NotNUll)
  def height = column[Float]("HEIGHT", O.NotNUll)
  def length = column[Float]("LENGTH", O.NotNull)
  def consumption = column[Float]("CONSUMPTION", O.NotNull)
  def popularity = column[Int]("POPULARITY", O.NotNull)
}
