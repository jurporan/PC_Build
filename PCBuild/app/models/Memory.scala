package models

import play.api.db.slick.Config.driver.simple._

case class Memory(id: Int, model: String, manufacturer: String, memorySize: Float, consumption:Float,  popularity: Int, price: Float, imageURL: String)

/* Table mapping
 */
class MemoryTable(tag: Tag) extends Table[Memory](tag, "MEMORY")
{
  def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)
  def model = column[String]("NAME", O.NotNull)
  def manufacturer = column[String]("MANUFACTURER", O.NotNull)
  def memorySize = column[Float]("MEMORY_SIZE", O.NotNull)
  def consumption = column[Float]("CONSUMPTION", O.NotNull)
  def popularity = column[Int]("POPULARITY", O.NotNull)
  def price = column[Float]("PRICE", O.NotNull)
  def imageURL = column[String]("IMAGE_URL")

  def * = (id, model, manufacturer, memorySize, consumption, popularity, price, imageURL) <> (Memory.tupled, Memory.unapply)
}
