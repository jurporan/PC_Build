package models

import play.api.db.slick.Config.driver.simple._

case class Memory(id: Int, model: String, manufacturer: String, memorySize: Float, memoryType: String, popularity: Int, price: Float, imageUrl: String)

/* Table mapping
 */
class MemoryTable(tag: Tag) extends Table[Memory](tag, "MEMORY")
{
  def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)
  def model = column[String]("MODEL", O.NotNull)
  def manufacturer = column[String]("MANUFACTURER", O.NotNull)
  def memorySize = column[Float]("MEMORY_SIZE", O.NotNull)
  def memoryType = column[String]("MEMORY_TYPE", O.NotNull)
  def popularity = column[Int]("POPULARITY", O.NotNull)
  def price = column[Float]("PRICE", O.NotNull)
  def imageUrl = column[String]("IMAGE_URL")

  def * = (id, model, manufacturer, memorySize, memoryType, popularity, price, imageUrl) <> (Memory.tupled, Memory.unapply)
}
