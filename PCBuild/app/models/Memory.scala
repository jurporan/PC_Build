package models

import play.api.db.slick.Config.driver.simple._

case class Memory(id: Int, model: String, manufacturer: String, memorySize: Float, consumption:Float,  popularity: Int)

/* Table mapping
 */
class MemoryTable(tag: Tag) extends Table[Memory](tag, "MEMORY")
{
  def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)
  def model = column[String]("NAME", O.NotNUll)
  def manufacturer = column[String]("MANUFACTURER", O.NotNUll)
  def memorySize = column[Float]("MEMORY_SIZE", O.NotNUll)
  def consumption = column[Float]("CONSUMPTION", O.NotNull)
  def popularity = column[Int]("POPULARITY", O.NotNull)
}